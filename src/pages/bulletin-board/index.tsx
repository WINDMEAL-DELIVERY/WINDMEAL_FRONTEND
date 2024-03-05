import BottomTab from '@components/bottom-tab';
import React, { useState } from 'react';
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
import OptionButtonComponent from '@/components/option-button-container';
import BottomModal from '@/components/bottom-modal';
import Destination from '@/components/bottom-modal/Destination';
import ETA from '@/components/bottom-modal/ETA';
import StoreType from '@/components/bottom-modal/Storetype';
import { useRecoilState } from 'recoil';
import { bulletinState } from '@/states/bulletinOption';

export default function BulletinBoard() {
  const [openBottomModal, setOpenBottomModal] = useState<number>(0);
  const [modalKey, setModalKey] = useState<number>(1);
  const [option, setOption] = useRecoilState(bulletinState);

  const handleClickOption = (optionId: number) => {
    if (optionId === -1) setOption({}); // 초기화
    setOpenBottomModal(optionId);
    setModalKey(prev => prev + 1);
  };

  const submitOption = (newOptions?: object) => {
    setOption({
      ...option,
      ...newOptions,
    });
  };

  return (
    <BulletinWrapper>
      <PageHeader icon1={<IconFind />} icon2={<IconCart />} title="게시판" />
      <OptionButtonComponent
        handleClickOption={handleClickOption}
        isMap={false}
      />
      <BulletinListContainer>
        <BulletinList>
          <BulletinListTitle>컴포즈커피</BulletinListTitle>
          <BulletinListInfoContainer>
            <BulletinListInfoText>가천관</BulletinListInfoText>
            <BulletinListInfoText>10분전</BulletinListInfoText>
            <BulletinListInfoText>리안이</BulletinListInfoText>
          </BulletinListInfoContainer>
        </BulletinList>
      </BulletinListContainer>
      {openBottomModal === 1 && (
        <BottomModal
          key={`ETA_${modalKey}`}
          content={<ETA submitOption={submitOption} />}
        />
      )}
      {openBottomModal === 2 && (
        <BottomModal
          key={`Destination_${modalKey}`}
          content={<Destination submitOption={submitOption} />}
        />
      )}
      {openBottomModal === 3 && (
        <BottomModal
          key={`StoreType_${modalKey}`}
          content={<StoreType submitOption={submitOption} />}
        />
      )}
      <BottomTab />
    </BulletinWrapper>
  );
}
