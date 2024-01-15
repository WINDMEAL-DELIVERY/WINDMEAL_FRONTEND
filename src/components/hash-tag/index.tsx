import { Input, Button, Spacer, Text } from '@geist-ui/core';
import Select from 'react-select';
import React, { useState } from 'react';
import {
  OptionTypeBase,
  StoreCategory,
  StoreCategoryTag,
  StoreIdProp,
  ValueType,
} from '@/types/type';
import { Card } from '@geist-ui/react';
import { useMutation, useQuery } from 'react-query';
import { createStoreCategory, getStoreInfo } from '@/apis/store/store';

export default function HashTag({ storeId }: StoreIdProp) {
  const [newTag, setNewTag] = useState<string>('');
  const [tags, setTags] = useState<StoreCategoryTag[]>([]);
  // 해당 store 가게 카테고리 get 해서 initial 값으로 setTags 지정

  useQuery<StoreCategory[]>(
    ['storeCategoryList', storeId],
    async () => {
      const {
        data: { storeCategoryResponse },
      } = await getStoreInfo(Number(storeId));
      return storeCategoryResponse;
    },
    {
      onSuccess: resp => {
        console.log('storeCategoryResponse', resp);
        setTags([
          ...resp.map(category => ({
            value: category.name,
            label: category.name,
          })),
        ]);
      },
      onError: err => console.log('!!', err),
    },
  );

  const mutateStoreCategory = useMutation(createStoreCategory, {
    onSuccess: resp => console.log('success post', resp),
  });

  const handleTagSubmit = () => {
    if (newTag.trim() !== '') {
      // 중복된 태그 체크
      if (!tags.some(tag => tag.value === newTag)) {
        setTags([...tags, { value: newTag, label: newTag }]);
        setNewTag('');
        mutateStoreCategory.mutate({
          storeId: Number(storeId),
          category: newTag,
        });
      }
    }
  };

  return (
    <Card>
      <Text h3>가게 카테고리</Text>
      <Spacer />
      <div style={{ display: 'flex', width: '80%' }}>
        <Input
          placeholder="가게 카테고리 입력"
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          crossOrigin={undefined}
        />
        <Spacer w={0.5} />
        <Button type="success-light" onClick={handleTagSubmit} auto scale={0.8}>
          추가
        </Button>
      </div>
      <Spacer />
      <Select
        isMulti
        styles={{
          control: provided => ({
            ...provided,
            width: '90%',
          }),
        }}
        options={tags}
        onChange={selectedTags =>
          setTags(selectedTags as ValueType<OptionTypeBase, true>)
        }
        value={tags}
        isDisabled
        isClearable={false}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
      />
    </Card>
  );
}
