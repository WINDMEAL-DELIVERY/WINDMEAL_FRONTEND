import Header from '@components/bottom-sheet/Header';
import {
  Content,
  ContentWrapper,
  Overlay,
  Wrapper,
} from '@components/bottom-modal/styles';
import { useRef, useState } from 'react';
import { BottomModalProps } from '@/types/type';

export default function BottomNonModal({ content }: BottomModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const modalBackground = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget && !isDragging) {
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <Wrapper>
          <Header />
          <ContentWrapper>
            <Content>{content}</Content>
          </ContentWrapper>
        </Wrapper>
      )}
      {isOpen && (
        <Overlay
          background="rgba(0, 0, 0, 0)"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          draggable="true"
          onClick={handleClickOut}
          ref={modalBackground}
        />
      )}
    </>
  );
}
