import { AutoComplete } from '@geist-ui/core';

export default function AutoCompleteBox() {
  const options = [
    { value: 'a', label: 'One' },
    { value: 'b', label: 'Two' },
    { value: 'c', label: 'Three' },
  ];

  return (
    <AutoComplete
      placeholder="Enter here"
      options={options}
      crossOrigin="anonymous"
    />
  );
}
