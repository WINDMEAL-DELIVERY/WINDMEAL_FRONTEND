import BottomTab from '@components/bottom-tab';
import React from 'react';
import { BulletinWrapper } from '@styles/bulletinStyles';
import { IconFind, IconCart } from 'public/svgs';
import PageHeader from '@/components/header';

export default function BulletinBoard() {
  return (
    <BulletinWrapper>
      <PageHeader icon1={<IconFind />} icon2={<IconCart />} title="게시판" />
      <BottomTab />
    </BulletinWrapper>
  );
}
