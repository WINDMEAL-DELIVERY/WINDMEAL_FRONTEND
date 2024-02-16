import Header from '@components/bottom-sheet/Header';
import {
  Content,
  ContentWrapper,
  ModalOverlay,
  Wrapper,
} from '@components/bottom-modal/styles';
import { useRef, useState } from 'react';
import { BottomModalProps } from '@/types/type';

export default function BottomModal({ content }: BottomModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const modalBackground = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
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
        <ModalOverlay onClick={handleClickOut} ref={modalBackground} />
      )}
    </>
  );
}

// overlay 설정
// 여러 곳에 쓰여야 하므로 재사용성 고려
// 각기 다른 조건 하에서 쓰이므로 recoil로 부르기 (0이면 닫히고 양수면 열리고)
// 1,2,3 양수에 따라서 커스텀되도록 하기
