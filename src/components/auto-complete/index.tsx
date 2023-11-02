import { AutoComplete } from '@geist-ui/core';
import { Wrapper } from './styles';

export default function AutoCompleteBox() {
  // 경우에 따라 파라미터로 style이나 options를 받아 사용하도록 변경 예정
  const options = [
    { value: 'a', label: 'One' },
    { value: 'b', label: 'Two' },
    { value: 'c', label: 'Three' },
  ];

  return (
    <Wrapper>
      <AutoComplete
        placeholder="Enter here"
        options={options}
        crossOrigin="anonymous"
        style={{
          zIndex: '999',
          backgroundColor: 'white',
          height: '40px',
        }}
      />
    </Wrapper>
  );
}
