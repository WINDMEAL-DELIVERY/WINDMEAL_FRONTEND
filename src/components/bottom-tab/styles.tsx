import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  padding: 2% 0 2% 0;
  background-color: whitesmoke;

  /* 핸드폰 */
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  /* 태블릿 */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 데스크탑 */
  @media screen and (min-width: 1025px) {
    width: 30%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;


export const NavItem = styled.a<{ $isActive: boolean }>`
  color: ${props => (props.$isActive ? 'green' : 'black')};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: green;
  }
`;
