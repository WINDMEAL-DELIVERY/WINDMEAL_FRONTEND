import React, { useState } from 'react';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import AddFile from '@components/add-file';
import { createStore } from '@/apis/cms-store/store';
import { useMutation, useQueryClient } from 'react-query';
import { StoreInput } from '@/types/type';

export default function AddStore() {
  const [storeImg, setStoreImg] = useState<string | null>(null);
  const initialStoreInput: StoreInput = {
    memberId: 4, // 이후 멤버 아이디 받아 넣어줘야함
    name: '',
    phoneNumber: '',
    openTime: '',
    closeTime: '',
    placeName: '',
    longitude: '',
    latitude: '',
    categoryList: [],
  };
  const [inputData, setInputData] = useState<StoreInput>(initialStoreInput);
  const [isSubmit, setIsSubmit] = useState(false);

  const queryClient = useQueryClient();

  const mutateStore = useMutation(createStore, {
    onSuccess: response => {
      console.log('createStore', response);
      queryClient.invalidateQueries('storeList');
      setInputData(initialStoreInput);
      setStoreImg(null);
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData();
    const storeImgOptional = storeImg === null ? 'defaultImgUrl' : storeImg;
    formData.append(
      'request',
      new Blob([JSON.stringify(inputData)], { type: 'application/json' }),
    );
    formData.append('file', storeImgOptional);
    mutateStore.mutate(formData);
    setIsSubmit(true);
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

  const renderInputs = () => {
    return inputFields.map(label => (
      <Input
        key={label[0]}
        label={label[0]}
        name={label[1]}
        width="95%"
        crossOrigin={undefined}
        value={inputData[label[1]]}
        onChange={e => handleInputChange(label[1], e.target.value)}
      />
    ));
  };

  return (
    <Card>
      <Text h3>가게 정보 입력</Text>
      <Spacer />
      {renderInputs()}
      <Spacer />
      <AddFile onImageUpload={handleAddFile} onSubmit={isSubmit} />
      <Spacer />
      <Button type="secondary" onClick={handleSubmit}>
        제출
      </Button>
    </Card>
  );
}
