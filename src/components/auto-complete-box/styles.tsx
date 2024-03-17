import styled from 'styled-components';
import { AutoComplete } from '@geist-ui/core';

export const Wrapper = styled.div`
  border: none;
  display: flex;
  width: 13.125rem;
  height: 2.75rem;
  // padding: 0.625rem 0.875rem;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  // flex-shrink: 0;

  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);

  & * {
    border: none;
  }
`;

export const CustomAutoComplete = styled(AutoComplete)`
  .input-wrapper {
    border: none !important;
  }
`;
