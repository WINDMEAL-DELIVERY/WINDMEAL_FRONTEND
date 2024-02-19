import styled from 'styled-components';

export const TopContainer = styled.div`
  width: 100%;
  height: 7rem; //
  margin-top: 0.44rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const FirstContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

export const CartButton = styled.div`
  display: flex;
  width: 3rem;
  height: 2.75rem;
  // padding: 0.625rem 0.875rem;
  align-items: center;
  justify-content: center;
  // gap: 0.625rem;
  flex-shrink: 0;

  border-radius: 1.25rem;
  background: var(--SubColor, #fff);
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.1);

  margin-left: 0.44rem;
  cursor: pointer;
`;

export const OptionButtonContainer = styled.div`
  width: 85%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
  margin-top: 0.44rem;
  gap: 0.59rem;
  align-self: flex-end; /* 홀로 오른쪽 정렬 */

  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 감추기 */
  }
`;

export const OptionButton = styled.div`
  display: flex;
  width: 5.625rem;
  height: 2.375rem;
  // padding: 0.625rem 0.875rem;
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
