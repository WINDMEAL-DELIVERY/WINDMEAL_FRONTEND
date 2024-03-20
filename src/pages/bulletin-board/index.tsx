import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@/styles/styles';
import React from 'react';
import Seo from '@/components/seo';

export default function BulletinBoard() {
  return (
    <Wrapper>
      <Seo
        title="요청 목록 페이지"
        description="요청 목록을 필터링 할 수 있으며 요청에 대한 상세 정보를 확인하실 수 있습니다."
      />
      <div>게시판</div>
      <BottomTab />
    </Wrapper>
  );
}
