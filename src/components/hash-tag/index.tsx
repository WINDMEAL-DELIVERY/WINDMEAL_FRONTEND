import { Input, Button, Spacer } from '@geist-ui/core';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import React, { useState } from 'react';

interface HashTag {
  value: string;
  label: string;
}

export default function HashTag() {
  const [newTag, setNewTag] = useState<string>('');
  const [tags, setTags] = useState<HashTag[]>([]);

  const handleTagSubmit = () => {
    if (newTag.trim() !== '') {
      // 중복된 태그 체크
      if (!tags.some(tag => tag.value === newTag)) {
        setTags([...tags, { value: newTag, label: newTag }]);
        setNewTag('');
      }
    }
  };

  const handleTagRemove = (removedTag: ValueType<OptionTypeBase, false>) => {
    if (removedTag) {
      setTags(tags.filter(tag => tag.value !== removedTag.value));
    }
  };

  return (
    <div>
      <Input
        placeholder="가게 카테고리 입력"
        value={newTag}
        onChange={e => setNewTag(e.target.value)}
        width="80%"
        crossOrigin={undefined}
      />
      <Spacer />
      <Button onClick={handleTagSubmit}>추가</Button>
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
    </div>
  );
}
