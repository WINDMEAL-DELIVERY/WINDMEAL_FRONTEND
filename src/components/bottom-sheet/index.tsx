import { useEffect, useState } from 'react';
import Header from '@components/bottom-sheet/Header';
import Content from '@components/bottom-sheet/Content';
import useBottomSheet from '@components/bottom-sheet/useBottomSheet';
import { BottomSheetContent, Wrapper } from '@components/bottom-sheet/styles';

export default function BottomSheet() {
  const { sheet, content } = useBottomSheet();
  const [BOTTOM_SHEET_HEIGHT, setBottomSheetHeight] = useState(0);

  useEffect(() => {
    setBottomSheetHeight(window.innerHeight - 60);
  }, []);

  return (
    <Wrapper ref={sheet} bottomsheetheight={BOTTOM_SHEET_HEIGHT}>
      <Header isHeaderBar isBottomSheet />
      <BottomSheetContent ref={content}>
        <Content />
      </BottomSheetContent>
    </Wrapper>
  );
}
