import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 1.13rem;
  position: relative;
  padding-top: 0.56rem;
  // padding-bottom: 1.13rem;
`;

const Handle = styled.div`
  width: 2rem;
  height: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: var(--SubColor, #a8b1ce);
  margin: auto;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Handle />
    </HeaderWrapper>
  );
}
