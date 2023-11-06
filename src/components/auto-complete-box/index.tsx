import { useState } from 'react';
import { AutoComplete } from '@geist-ui/core';
import { Wrapper } from '@components/auto-complete-box/styles';
import { AutoCompleteOption } from '@geist-ui/core/esm/auto-complete';

export default function AutoCompleteBox({selected, setSelected}) {
  // 경우에 따라 파라미터로 style이나 options를 받아 사용하도록 변경 예정
  const allOptions = [
    { value: '신의 한컵', label: '신의 한컵' },
    { value: '컴포즈 커피', label: '컴포즈 커피' },
    { value: '커피만', label: '커피만' },
  ];
  // const [selected, setSelected] = useState<AutoCompleteOption[]>(allOptions[1]);
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const handleSearch = (currentValue: string) => {
    if (!currentValue) return setOptions(allOptions);
    const relatedOptions = allOptions.filter(item =>
      item.value.includes(currentValue),
    );
    setOptions(relatedOptions);
  };

  const handleSelect = (selectedValue: string) => {
    setSelected(selectedValue);
  };

  return (
    <Wrapper>
      <AutoComplete
        placeholder="검색해보세요!"
        options={options}
        crossOrigin="anonymous"
        onSearch={handleSearch}
        onSelect={handleSelect}
        style={{
          zIndex: '999',
          backgroundColor: 'white',
          height: '40px',
        }}
      />
    </Wrapper>
  );
}
