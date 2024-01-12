import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@/styles/styles';
import React from 'react';

export default function BulletinBoard() {
  return (
    <Wrapper>
      <div>게시판</div>
      <BottomTab />
    </Wrapper>
  );
}
