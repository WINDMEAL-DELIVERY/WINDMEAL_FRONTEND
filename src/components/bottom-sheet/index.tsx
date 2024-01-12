import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header';
import Content from './Content';

import { BOTTOM_SHEET_HEIGHT } from './BottomSheetOption';
import useBottomSheet from './useBottomSheet';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 18;
  top: calc(100% - 90px); /*시트가 얼마나 높이 위치할지*/
  left: 0;
  right: 0;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT}px;

  background: linear-gradient(
    359.26deg,
    #3c41c7 0.02%,
    #3742b2 83.23%,
    #3642ae 98.76%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

export default function BottomSheet() {
  const { sheet, content } = useBottomSheet();

  // 윈도우 받아오는 것 확인
  if (typeof window !== 'undefined')
    console.log('window.innerHeight', window.innerHeight);
  else console.log('!!', typeof window);

  return (
    <Wrapper ref={sheet}>
      <Header />
      <BottomSheetContent ref={content}>
        <Content />
      </BottomSheetContent>
    </Wrapper>
  );
}

// sheet은 시트가 깔리는 배경을 가리킴
// content는 시트 안에 공간
