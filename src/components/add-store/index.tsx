import React, { CSSProperties, useState } from 'react';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import AddFile from '@components/add-file';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

export default function AddStore() {
  const [storeImg, setStoreImg] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputData, setInputData] = useState({
    memberId: 1,
    name: '',
    phoneNumber: '',
    openTime: '',
    closeTime: '',
    placeName: '',
    longitude: '',
    latitude: '',
    categoryList: selectedOptions,
  });
  const defaultImgUrl =
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F67%2F41%2Fb9%2F6741b98b6e8f6754c16775da03334535.png&type=sc960_832';

  // 이후 category get 해줘야
  const options = [
    { value: '카페', label: '카페' },
    { value: '식당', label: '식당' },
    { value: '생필품', label: '생필품' },
  ];

  const handleMultiChange = (updatedArray: Option[]) => {
    const newArray = updatedArray.map(element => element.value);
    setSelectedOptions(newArray);
    setInputData(prevData => ({
      ...prevData,
      categoryList: newArray,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData();
    const storeImgOptional = storeImg === null ? defaultImgUrl : storeImg;
    formData.append('request', JSON.stringify(inputData));
    formData.append('file', storeImgOptional);
    for (const pair of formData.entries()) {
      console.log(pair);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleAddFile = (img: string) => {
    setStoreImg(img);
  };

  const inputFields = [
    ['가게 이름', 'name'],
    ['전화 번호', 'phoneNumber'],
    ['오픈 시간', 'openTime'],
    ['마감 시간', 'closeTime'],
    ['장소 이름', 'placeName'],
    ['위도', 'longitude'],
    ['경도', 'latitude'],
  ];

  const customStyles = {
    control: (provided: CSSProperties) => ({
      ...provided,
      width: '90%',
    }),
  };

  const renderInputs = () => {
    return inputFields.map(label => (
      <Input
        key={label[0]}
        label={label[0]}
        name={label[1]}
        width="95%"
        crossOrigin={undefined}
        onChange={e => handleInputChange(label[1], e.target.value)}
      />
    ));
  };

  return (
    <Card>
      <Text h3>가게 정보 입력</Text>
      <Spacer />
      {renderInputs()}
      <Select
        isMulti
        options={options}
        styles={customStyles}
        onChange={handleMultiChange}
      />
      <Spacer />
      <AddFile onImageUpload={handleAddFile} />
      <Spacer />
      <Button type="secondary" onClick={handleSubmit}>
        제출
      </Button>
      <Spacer style={{ marginTop: '3rem' }} />
    </Card>
  );
}
