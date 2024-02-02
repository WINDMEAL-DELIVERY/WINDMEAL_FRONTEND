import Header from '@components/bottom-sheet/Header';
import {
  Content,
  ContentWrapper,
  Overlay,
  Wrapper,
} from '@components/bottom-modal/styles';
import { useState } from 'react';

export default function BottomModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOut = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <Wrapper>
        <Header />
        <ContentWrapper>
          <Content />
        </ContentWrapper>
      </Wrapper>
      <Overlay onClick={handleClickOut} />
    </>
  );
}

// overlay 설정
// 여러 곳에 쓰여야 하므로 재사용성 고려
// 각기 다른 조건 하에서 쓰이므로 recoil로 부르기 (0이면 닫히고 양수면 열리고)
// 1,2,3 양수에 따라서 커스텀되도록 하기
