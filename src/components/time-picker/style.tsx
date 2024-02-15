import styled from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 33%;
  height: 150px;
  overflow-y: scroll;
  position: relative;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`;

export const ListCenter = styled.div`
  box-sizing: border-box;
  height: 50px;
  position: sticky;
  top: 50px;
`;

export const ListItem = styled.li<{ $isSelected: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isSelected }) => $isSelected && '#5776B9'};
  font-weight: ${({ $isSelected }) => $isSelected && 'bold'};
  opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0.4)};

  font-family: 'SF Pro Text';
`;
