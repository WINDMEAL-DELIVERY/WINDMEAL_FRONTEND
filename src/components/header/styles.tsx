import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 2rem);
  height: calc(3.5rem - 2rem); /* inner padding */
  padding: 1rem;
`;

export const GoBack = styled.button`
  cursor: pointer;
  margin-left: 0.5rem;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
  margin-left: auto;
`;

export const Title = styled.span`
  color: var(--MainText, #1f1f1f);
  font-family: 'Noto Sans KR';
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.03375rem;
`;
