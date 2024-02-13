import { useState } from 'react';
import { AutoComplete } from '@geist-ui/core';
import { Wrapper } from '@components/auto-complete-box/styles';
import { AutoCompleteOption } from '@geist-ui/core/esm/auto-complete';
import { IconFind } from 'public/svgs';

export default function AutoCompleteBox({
  handleSelect,
}: {
  handleSelect: (selectedValue: string) => void;
}) {
  // 경우에 따라 파라미터로 style이나 options를 받아 사용하도록 변경 예정
  const allOptions = [
    { value: '신의 한컵', label: '신의 한컵' },
    { value: '컴포즈 커피', label: '컴포즈 커피' },
    { value: '커피만', label: '커피만' },
  ];
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const handleSearch = (currentValue: string) => {
    if (!currentValue) return setOptions(allOptions);
    const relatedOptions = allOptions.filter(item =>
      item.value.includes(currentValue),
    );
    return setOptions(relatedOptions);
  };

  return (
    <Wrapper>
      <AutoComplete
        placeholder="가게를 검색해주세요"
        options={options}
        crossOrigin="anonymous"
        onSearch={handleSearch}
        onSelect={handleSelect}
        width="10rem"
        style={{
          // height: '100%',
          border: 'none',
        }}
      />
      <IconFind />
    </Wrapper>
  );
}
