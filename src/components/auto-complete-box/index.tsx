import { useState } from 'react';
import { AutoComplete } from '@geist-ui/core';
import { Wrapper } from './styles';

export default function AutoCompleteBox() {
  // 경우에 따라 파라미터로 style이나 options를 받아 사용하도록 변경 예정
  const allOptions = [
    { value: '신의 한컵', label: '신의 한컵' },
    { value: '컴포즈 커피', label: '컴포즈 커피' },
    { value: '커피만', label: '커피만' },
  ];
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const searchHandler = (currentValue: string) => {
    if (!currentValue) return setOptions([]);
    const relatedOptions = allOptions.filter(item =>
      item.value.includes(currentValue),
    );
    setOptions(relatedOptions);
  };

  return (
    <Wrapper>
      <AutoComplete
        placeholder="Enter here"
        options={options}
        crossOrigin="anonymous"
        onSearch={searchHandler}
        style={{
          zIndex: '999',
          backgroundColor: 'white',
          height: '40px',
        }}
      />
    </Wrapper>
  );
}
