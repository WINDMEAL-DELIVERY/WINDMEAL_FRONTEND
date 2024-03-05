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
import { useQuery } from 'react-query';
import { getAllOrders } from '@/apis/order/order';
import { Order } from '@/types/type';

export default function BulletinBoard() {
  const [openBottomModal, setOpenBottomModal] = useState<number>(0);
  const [modalKey, setModalKey] = useState<number>(1);
  const [option, setOption] = useRecoilState(bulletinState);

  const { data: allOrders } = useQuery<Order[]>(
    ['allOrders', option],
    async () => {
      const {
        data: { content },
      } = await getAllOrders(option);
      return content;
    },
    {
      onSuccess: orderResponse => {
        console.log('orderResponse', orderResponse);
      },
      onError: err => console.log('error', err),
    },
  );

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
        {allOrders?.map(order => (
          <BulletinList key={order.id}>
            <BulletinListTitle>{order.id}</BulletinListTitle>
            <BulletinListInfoContainer>
              <BulletinListInfoText>{order.placeName}</BulletinListInfoText>
              <BulletinListInfoText>10분전</BulletinListInfoText>
              <BulletinListInfoText>
                {order.memberNickName}
              </BulletinListInfoText>
            </BulletinListInfoContainer>
          </BulletinList>
        ))}
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
