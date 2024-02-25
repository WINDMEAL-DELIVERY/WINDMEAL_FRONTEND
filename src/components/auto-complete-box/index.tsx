import { useState } from 'react';
import {
  CustomAutoComplete,
  Wrapper,
} from '@components/auto-complete-box/styles';
import { AutoCompleteOption } from '@geist-ui/core/esm/auto-complete';
import { IconFind } from 'public/svgs';
import { AutoComplete, StoreListProps } from '@/types/type';
import { useQuery } from 'react-query';
import { getStoreList } from '@/apis/cms-store/store';

export default function AutoCompleteBox({
  handleSelect,
}: {
  handleSelect: (selectedValue: number) => void;
}) {
  const [allOptions, setAllOptions] = useState<AutoComplete[]>([]);
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
        console.log('자동완성 store list', storeNameList);
        storeNameList.forEach(e => {
          const value = e.name;
          const label = e.name;
          const { storeId } = e;
          setAllOptions(prev => prev.concat({ value, label, storeId }));
        });
      },
      onError: err => console.log('error', err),
    },
  );

  const [options, setOptions] = useState<AutoCompleteOption[]>([]);

  const handleSearch = (currentValue: string) => {
    if (!currentValue) return setOptions(allOptions);
    const relatedOptions = allOptions.filter(item =>
      item.value.includes(currentValue),
    );
    return setOptions(relatedOptions);
  };

  const handleSelectAutoComplete = (selectedString: string) => {
    const store = allOptions.filter(e => e.value === selectedString);
    handleSelect(store[0].storeId);
  };

  return (
    <Wrapper>
      <CustomAutoComplete
        placeholder="가게를 검색해주세요"
        options={options}
        crossOrigin="anonymous"
        onSearch={handleSearch}
        onSelect={handleSelectAutoComplete}
        width="10rem"
      />
      <IconFind />
    </Wrapper>
  );
}
