/* eslint-disable react/no-array-index-key */
import { getStoreList } from '@/apis/cms-store/store';
import { AutoCompleteType, StoreListProps } from '@/types/type';
import { AutoCompleteOption } from '@geist-ui/core/esm/auto-complete';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  SearchBoxContainer,
  SearchInput,
  SearchButton,
  SearchListContainer,
  SearchList,
  SearchInputWrapper,
  SearchListText,
} from '@components/search-box/styles';
import { GoBack, Header, Icons } from '@components/header/styles';
import { IconCart, IconFind, IconLt } from 'public/svgs';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { bulletinStoreState } from '@/states/bulletinOption';

export function SearchBox({ refetch }: { refetch: () => void }) {
  const [allOptions, setAllOptions] = useState<AutoCompleteType[]>([]);
  const [searchList, setSearchList] = useState<AutoCompleteOption[]>([]); // 자동완성 리스트
  const [inputValue, setInputValue] = useState<string>('');
  const [bulletinOption, setBulletinOption] =
    useRecoilState(bulletinStoreState);
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
      setSearchList(allOptions);
    } else {
      const relatedOptions = allOptions.filter(item =>
        item.value.toLowerCase().includes(currentValue.toLowerCase()),
      );
      setSearchList(relatedOptions);
    }
  };

  const handleClickFind = () => {
    console.log(inputValue);

    const newOptions = { storeCategory: inputValue };
    setBulletinOption({ ...bulletinOption, ...newOptions });
    setInputValue('');
    setSearchList([]);
  };

  const handleSelectAutoComplete = (selectedString: string) => {
    console.log(selectedString);

    const newOptions = { storeCategory: selectedString };
    setBulletinOption({ ...bulletinOption, ...newOptions });
    setInputValue('');
    setSearchList([]);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <SearchBoxContainer>
      <Header>
        <GoBack onClick={router.back}>
          <IconLt />
        </GoBack>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="가게, 키워드 검색"
            value={inputValue}
            onChange={e => handleSearch(e.target.value)}
            onFocus={e => handleSearch(e.target.value)}
          />
          <SearchButton onClick={handleClickFind}>
            <IconFind />
          </SearchButton>
        </SearchInputWrapper>
        <Icons>
          <IconCart />
        </Icons>
      </Header>

      <SearchListContainer>
        {searchList.map((option, index) => (
          <SearchList
            key={index}
            onClick={() => handleSelectAutoComplete(option.value)}
          >
            <IconFind /> <SearchListText> {option.label}</SearchListText>
          </SearchList>
        ))}
      </SearchListContainer>
    </SearchBoxContainer>
  );
}
