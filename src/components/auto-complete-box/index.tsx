import { useState } from 'react';
import {
  CustomAutoComplete,
  Wrapper,
  dropdownStyles,
} from '@components/auto-complete-box/styles';
import { AutoCompleteOption } from '@geist-ui/core/esm/auto-complete';
import { IconFind } from 'public/svgs';
import { AutoCompleteType, StoreListProps } from '@/types/type';
import { useQuery } from 'react-query';
import { getStoreList } from '@/apis/cms-store/store';
import { useRecoilState } from 'recoil';
import { storeState } from '@/states/mapOption';
import { AutoComplete } from '@geist-ui/core';

export default function AutoCompleteBox() {
  const [allOptions, setAllOptions] = useState<AutoCompleteType[]>([]);
  // 경우에 따라 파라미터로 style이나 options를 받아 사용하도록 변경 예정
  useQuery<StoreListProps[]>(
    ['storeNameList'],
    async () => {
      const {
        data: { content },
      } = await getStoreList();
      return content;
    },
    {
      onSuccess: storeNameList => {
        storeNameList.forEach(e => {
          const value = e.name;
          const label = e.name;
          const { storeId } = e;
          setAllOptions(prev => {
            if (!prev.some(element => element.value === value))
              return prev.concat({ value, label, storeId });
            return prev;
          });
        });
      },
      onError: err => console.log('error', err),
    },
  );

  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [option, setOption] = useRecoilState(storeState);

  const handleSearch = (currentValue: string) => {
    if (!currentValue) return setOptions(allOptions);
    setInputValue(currentValue);
    const relatedOptions = allOptions.filter(item =>
      item.value.includes(currentValue),
    );
    return setOptions(relatedOptions);
  };

  const handleSelectAutoComplete = (selectedString: string) => {
    setInputValue(selectedString);
  };

  const handleClickFind = () => {
    const newOptions = { storeCategory: inputValue };
    setOption({
      ...option,
      ...newOptions,
    });
    setInputValue('');
  };

  return (
    <Wrapper>
      <CustomAutoComplete
        placeholder="가게, 키워드 검색"
        options={options}
        value={inputValue}
        crossOrigin="anonymous"
        onSearch={handleSearch}
        onSelect={handleSelectAutoComplete}
        width="10rem"
        dropdownStyle={dropdownStyles}
      >
        <AutoComplete.Empty hidden />
      </CustomAutoComplete>
      <IconFind onClick={handleClickFind} style={{ cursor: 'pointer' }} />
    </Wrapper>
  );
}
