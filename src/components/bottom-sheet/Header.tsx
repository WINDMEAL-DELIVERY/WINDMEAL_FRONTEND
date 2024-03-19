import { headerBar } from '@/types/type';
import styled from 'styled-components';

const HeaderWrapper = styled.div<{ $isBottomSheet: boolean }>`
  height: ${props => (props.$isBottomSheet ? '2rem' : '1.13rem')};
  position: relative;
  padding-top: 0.56rem;
`;

const Handle = styled.div`
  width: 2rem;
  height: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  background: var(--SubColor, #a8b1ce);
  margin: auto;
`;

export default function Header({
  isHeaderBar = false,
  isBottomSheet = false,
}: headerBar) {
  return (
    <HeaderWrapper $isBottomSheet={isBottomSheet}>
      {isHeaderBar ? <Handle /> : null}
    </HeaderWrapper>
  );
}
