import styled from 'styled-components';

export const OptionButtonContainer = styled.div<{ $isMap?: boolean }>`
  width: 85%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
  margin-bottom: 0.81rem;
  margin-top: 0.44rem;
  gap: 0.59rem;
  align-self: ${({ $isMap }) => ($isMap ? 'flex-end' : 'center')};
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 감추기 */
  }
`;

export const OptionButton = styled.div`
  display: flex;
  width: 5.625rem;
  height: 2.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  cursor: pointer;

  border-radius: 1.25rem;
  background: var(--BG, #fff);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
`;

export const OptionText = styled.p`
  color: var(--MainText, #1f1f1f);
  font-family: 'Noto Sans KR';
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01875rem;
`;

export const OptionIcon = styled.div`
  width: 0.8125rem;
  height: 0.6875rem;
  flex-shrink: 0;
`;
