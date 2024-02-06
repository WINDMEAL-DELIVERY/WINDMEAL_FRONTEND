import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  width: inherit;
  z-index: 2;
  top: 50vh; //전체 화면의 3/8
  height: 100%;

  border-radius: 1.875rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

  background: var(--BG, #fff);
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.05);
`;

export const ContentWrapper = styled.div`
  margin-bottom: 56px; //바텀탭만큼
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: inherit;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

export const MapOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

export const MapOptionTitle = styled.p`
  font-size: 1.56rem;
  font-style: bold;
  font-family: 'Noto Sans KR';
  line-height: normal;
`;

export const MapOptionDescription = styled.p`
  font-size: 0.88rem;
  font-style: regular;
  font-family: 'Noto Sans KR';
`;
