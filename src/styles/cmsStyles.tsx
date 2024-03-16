import { Text } from '@geist-ui/core';
import styled from 'styled-components';

export const CMSWrapper = styled.div`
  /* 전체 적용 스타일 */
  background-color: white;
  min-height: 100dvh;

  /* 핸드폰 */
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  /* 태블릿 */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 데스크탑 */
  @media screen and (min-width: 1025px) {
    width: 1024px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledText = styled(Text)`
  cursor: pointer;
  width: 5rem;
  padding: 0.5rem;
  margin: 0.2rem 0;
  border-radius: 0.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
