import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@/styles/styles';
import React from 'react';
import BottomSheet from '@/components/bottom-sheet';

export default function BulletinBoard() {
  return (
    <Wrapper>
      <div>게시판</div>
      <BottomSheet />
    </Wrapper>
  );
}
