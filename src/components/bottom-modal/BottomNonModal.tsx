import Header from '@components/bottom-sheet/Header';
import {
  ContentWrapper,
  NonModalOverlay,
  StoreInfoContent,
  Wrapper,
} from '@components/bottom-modal/styles';
import { useRef, useState } from 'react';
import { BottomModalProps } from '@/types/type';

export default function BottomNonModal({ content }: BottomModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const modalBackground = useRef(null);
  const [startY, setStartY] = useState<number | null>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDragStart = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY); // 드래그 시작 시 Y 좌표 저장
  };

  const handleDragEnd = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    const endY = 'touches' in e ? e.changedTouches[0].clientY : e.clientY;
    if (startY !== null && endY - startY > 20) {
      closeModal(); // 드래그 이동 거리가 일정 이상이면 모달 닫기 함수 호출
    }
    setStartY(null); // Y 좌표 초기화
  };

  const handleClickOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <Wrapper
          $top={60}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <Header isHeaderBar />
          <ContentWrapper>
            <StoreInfoContent>{content}</StoreInfoContent>
          </ContentWrapper>
        </Wrapper>
      )}
      {isOpen && (
        <NonModalOverlay
          draggable="true"
          onClick={handleClickOut}
          ref={modalBackground}
        />
      )}
    </>
  );
}
