import BottomTab from '@components/bottom-tab';
import React from 'react';
import {
  BulletinList,
  BulletinListContainer,
  BulletinListInfoContainer,
  BulletinListInfoText,
  BulletinListTitle,
  BulletinWrapper,
} from '@styles/bulletinStyles';
import { IconFind, IconCart } from 'public/svgs';
import PageHeader from '@/components/header';

export default function BulletinBoard() {
  return (
    <BulletinWrapper>
      <PageHeader icon1={<IconFind />} icon2={<IconCart />} title="게시판" />
      <BulletinListContainer>
        <BulletinList>
          <BulletinListTitle>컴포즈커피</BulletinListTitle>
          <BulletinListInfoContainer>
            <BulletinListInfoText>가천관</BulletinListInfoText>
            <BulletinListInfoText>10분전</BulletinListInfoText>
            <BulletinListInfoText>리안이</BulletinListInfoText>
          </BulletinListInfoContainer>
        </BulletinList>
        <BulletinList>
          <BulletinListTitle>컴포즈커피2</BulletinListTitle>
          <BulletinListInfoContainer>
            <BulletinListInfoText>가천관</BulletinListInfoText>
            <BulletinListInfoText>10분전</BulletinListInfoText>
            <BulletinListInfoText>리안이</BulletinListInfoText>
          </BulletinListInfoContainer>
        </BulletinList>
      </BulletinListContainer>
      <BottomTab />
    </BulletinWrapper>
  );
}
