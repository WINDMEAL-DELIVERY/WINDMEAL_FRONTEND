import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  background-color: #f5f8faff;
`;

export const Wrapper = styled.div`
  /* 전체 적용 스타일 */
  background-color: white;
  min-height: 100dvh;

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
export const HeaderBar = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  background-color: #f5f8faff;
  padding: 0 1.5% 0 1.5%;
`;
