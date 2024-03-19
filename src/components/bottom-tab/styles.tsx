import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: whitesmoke;
  z-index: 3;
  height: 56px;

  /* 핸드폰 */
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 56px;
  }

  /* 태블릿 */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50%;
    height: 56px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 데스크탑 */
  @media screen and (min-width: 1025px) {
    width: 30%;
    height: 56px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const NavItem = styled(Link)<{ $isActive: boolean }>`
  color: ${props => (props.$isActive ? '#5776B9' : 'black')};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #5776b9;
  }
`;
