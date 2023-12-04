import styled from 'styled-components';

export const TopContainer = styled.div`
  width: 80%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
`;

export const OptionButtonContainer = styled.div`
  width: 80%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 999;
  margin-top: 1rem;
`;

export const OptionButton = styled.button`
  width: 5rem;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  cursor: pointer;
`;
