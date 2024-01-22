import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Header from './Header';
import Content from './Content';

import useBottomSheet from './useBottomSheet';

const Wrapper = styled(motion.div)<{ bottomsheetheight: number }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  width: inherit;
  z-index: 1;
  top: calc(100% - 5rem); /*시트가 얼마나 높이 위치할지 1단계*/

  border-radius: 1.875rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${props => props.bottomsheetheight}px;

  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 56px; // 이후 bottom-tab 높이 확정 시 값 수정 (content가 바텀탭에 가리지 않도록)
`;

export default function BottomSheet() {
  const { sheet, content } = useBottomSheet();
  const [BOTTOM_SHEET_HEIGHT, setBottomSheetHeight] = useState(0);

  useEffect(() => {
    setBottomSheetHeight(window.innerHeight - 60);
  }, []);

  return (
    <Wrapper ref={sheet} bottomsheetheight={BOTTOM_SHEET_HEIGHT}>
      <Header />
      <BottomSheetContent ref={content}>
        <Content />
      </BottomSheetContent>
    </Wrapper>
  );
}
