import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)<{ bottomsheetheight: number }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  // width: inherit;
  z-index: 1;
  top: calc(100% - 5rem); /*시트가 얼마나 높이 위치할지 1단계*/

  border-radius: 1.875rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${props => props.bottomsheetheight}px;

  background: var(--BG, #fff);
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.05);
  transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/

  /* 핸드폰 */
  @media screen and (max-width: 768px) {
    width: 430px;
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

export const BottomSheetContent = styled.div`
  -webkit-overflow-scrolling: touch;
`;
