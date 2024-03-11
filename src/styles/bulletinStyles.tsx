import styled from 'styled-components';
import { Wrapper } from '@styles/styles';

export const BulletinWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

export const BulletinListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 2px solid #f2f4ff;

  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`;

export const BulletinList = styled.div<{ $noOrder: boolean }>`
  display: flex;
  flex-direction: column;
  height: 5.75rem;
  justify-content: center;
  align-items: ${({ $noOrder }) => ($noOrder ? 'center' : 'stretch')};
  margin-left: 1rem;
  gap: 0.44rem;
  border-bottom: ${({ $noOrder }) => ($noOrder ? 'none' : '2px solid #f2f4ff')};

  &:last-child {
    margin-bottom: 5rem; // 바텀탭 고려
  }
`;

export const BulletinListTitle = styled.p`
  color: var(--MainText, #1f1f1f);

  /* SubMain */
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.025rem;
`;

export const BulletinListInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BulletinListInfoText = styled.p`
  color: var(--SubText, #696e82);
  cursor: pointer;

  /* Sub */
  font-family: 'Noto Sans KR';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 1.09375rem */
  letter-spacing: -0.02188rem;

  &::after {
    content: '│';
    margin: 0 0.3rem 0 0.3rem;
    color: #696e82;
  }

  &:last-child::after {
    content: none;
  }
`;
