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
