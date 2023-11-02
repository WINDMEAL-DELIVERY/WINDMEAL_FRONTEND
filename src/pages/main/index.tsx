// import { Combobox } from '@geist-ui/react';
import { AutoComplete } from '@geist-ui/core';

export default function main() {
  const options = [
    { value: 'a', label: 'One' },
    { value: 'b', label: 'Two' },
    { value: 'c', label: 'Three' },
  ];

  return (
    <div>
      <div>메인페이지입니다.</div>
      <AutoComplete
        placeholder="Enter here"
        options={options}
        crossOrigin="anonymous"
      />
    </div>
  );
}
