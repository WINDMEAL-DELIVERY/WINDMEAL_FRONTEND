import React from 'react';
import { Card, Text, Spacer, Input, Button, Select } from '@geist-ui/react';
import AddFile from '@components/add-file';

export default function AddStore() {
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleInputChange = (value) => {

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
        onChange={() => handleInputChange(label[1])}
      />
    ));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Text h3>가게 정보 입력</Text>
        <Spacer />
        {renderInputs()}
        <Select placeholder="카페">
          <Select.Option value="카페">카페</Select.Option>
          <Select.Option value="식당">식당</Select.Option>
          <Select.Option value="생필품">생필품</Select.Option>
        </Select>
        <Spacer />
        <AddFile />
        <Spacer />
        <Button type="secondary" onClick={handleSubmit}>
          제출
        </Button>
      </form>
    </Card>
  );
}
