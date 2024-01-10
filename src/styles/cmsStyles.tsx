import { Text } from '@geist-ui/core';
import styled from 'styled-components';

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
