import { Input, Button, Spacer, Text } from '@geist-ui/core';
import Select from 'react-select';
import React, { useState } from 'react';
import { StoreCategory } from '@/types/type';
import { Card } from '@geist-ui/react';

export default function HashTag() {
  const [newTag, setNewTag] = useState<string>('');
  const [tags, setTags] = useState<StoreCategory[]>([]);

  const handleTagSubmit = () => {
    if (newTag.trim() !== '') {
      // 중복된 태그 체크
      if (!tags.some(tag => tag.value === newTag)) {
        setTags([...tags, { value: newTag, label: newTag }]);
        setNewTag('');
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
