/* eslint-disable react/no-array-index-key */
import { getStoreList } from '@/apis/cms-store/store';
import { AutoCompleteType, StoreListProps } from '@/types/type';
import { AutoCompleteOption } from '@geist-ui/core/esm/auto-complete';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  SearchBoxContainer,
  SearchInput,
  SearchButton,
  SearchListContainer,
  SearchList,
  SearchTopContainer,
} from '@components/search-box/styles';
import { GoBack, Header, Icons } from '@components/header/styles';
import { IconCart, IconLt } from 'public/svgs';
import { useRouter } from 'next/router';

export function SearchBox() {
  const [allOptions, setAllOptions] = useState<AutoCompleteType[]>([]);
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [bulletinOption, setBulletinOption] = useState({});
  const router = useRouter();

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

  const handleSearch = (currentValue: string) => {
    setInputValue(currentValue);
    if (currentValue === '') {
      setOptions(allOptions);
    } else {
      const relatedOptions = allOptions.filter(item =>
        item.value.toLowerCase().includes(currentValue.toLowerCase()),
      );
      setOptions(relatedOptions);
    }
  };

  const handleSelectAutoComplete = (selectedString: string) => {
    setInputValue(selectedString);
  };

  const handleClickFind = () => {
    const newOptions = { storeCategory: inputValue };
    setBulletinOption({ ...bulletinOption, ...newOptions });
    setInputValue('');
  };

  return (
    <SearchBoxContainer>
      <Header>
        <GoBack onClick={router.back}>
          <IconLt />
        </GoBack>
        <SearchTopContainer>
          <SearchInput
            type="text"
            placeholder="가게, 키워드 검색"
            value={inputValue}
            onChange={e => handleSearch(e.target.value)}
            onFocus={e => handleSearch(e.target.value)}
          />
          <SearchButton onClick={handleClickFind}>Find</SearchButton>
        </SearchTopContainer>
        <Icons>
          <IconCart />
        </Icons>
      </Header>

      <SearchListContainer>
        {options.map((option, index) => (
          <SearchList
            key={index}
            onClick={() => handleSelectAutoComplete(option.value)}
          >
            {option.label}
          </SearchList>
        ))}
      </SearchListContainer>
    </SearchBoxContainer>
  );
}
