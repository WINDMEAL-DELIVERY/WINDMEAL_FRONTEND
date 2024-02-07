import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 2;
  top: 50vh; //전체 화면의 3/8
  height: 100%;

  border-radius: 1.875rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

  background: var(--BG, #fff);
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.05);

  /* 핸드폰 */
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  /* 태블릿 */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50%;
  }

  /* 데스크탑 */
  @media screen and (min-width: 1025px) {
    width: 30%;
  }
`;

export const ContentWrapper = styled.div`
  margin-bottom: 56px; //바텀탭만큼
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: inherit;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;

  /* 핸드폰 */
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  /* 태블릿 */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50%;
  }

  /* 데스크탑 */
  @media screen and (min-width: 1025px) {
    width: 30%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem 2rem 2rem 2.5rem;
`;

export const MapOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MapOptionTitle = styled.p`
  font-size: 1.56rem;
  font-weight: 700;
  font-family: 'Noto Sans KR';
  line-height: normal;
`;

export const MapOptionDescription = styled.p`
  font-size: 0.88rem;
  font-style: regular;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  margin-top: 1rem;
`;

export const MapOptionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.88rem;
  font-style: regular;
  font-family: 'Noto Sans KR';
  line-height: 3.5rem;
  margin-top: 1rem;
`;

export const MapOptionList = styled.p`
  font-size: 0.88rem;
  font-family: 'Noto Sans KR';
  font-weight: 600;
`;
