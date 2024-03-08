import styled from 'styled-components';

export const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.375rem;
  background-color: #f2f4ff;
  border-radius: 1.25rem;
  flex-grow: 1;
  margin-right: 1rem;
`;

export const SearchInput = styled.input`
  display: flex;
  height: 1.1rem;
  margin-left: 0.88rem;
  background-color: #f2f4ff;
  color: #1f1f1f;

  /* Sub */
  font-family: 'Noto Sans KR';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 125%; /* 1.09375rem */
  letter-spacing: -0.02188rem;
`;

export const SearchButton = styled.button`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 0.8rem;
`;

export const SearchListContainer = styled.ul`
  display: flex;
  flex-direction: column;

  margin-left: 1.5rem;
  margin-top: 1rem;

  gap: 1.6rem;
`;

export const SearchList = styled.li`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const SearchListText = styled.p`
  color: var(--MainText, #1f1f1f);

  /* Sub */
  font-family: 'Noto Sans KR';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  letter-spacing: -0.02188rem;
`;
