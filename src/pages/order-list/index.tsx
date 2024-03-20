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
import { bulletinStoreState } from '@/states/bulletinOption';
import { useQuery } from 'react-query';
import { getAllOrders } from '@/apis/order/order';
import { Order } from '@/types/type';
import { formatDateTime } from '@/hooks/useFormatTime';
import { SearchBox } from '@/components/search-box';
import Seo from '@/components/seo';

export default function BulletinBoard() {
  const [openBottomModal, setOpenBottomModal] = useState<number>(0);
  const [modalKey, setModalKey] = useState<number>(1);
  const [option, setOption] = useRecoilState(bulletinStoreState);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const { data: allOrders, refetch } = useQuery<Order[]>(
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
      <Seo
        title="요청 목록 페이지"
        description="요청 목록을 필터링 할 수 있으며 요청에 대한 상세 정보를 확인하실 수 있습니다."
      />
      {isSearch ? (
        <SearchBox refetch={refetch} setIsSearch={setIsSearch} />
      ) : (
        <>
          <PageHeader
            icon1={
              <IconFind
                onClick={() => setIsSearch(true)}
                style={{ cursor: 'pointer' }}
              />
            }
            icon2={<IconCart style={{ cursor: 'pointer' }} />}
            title="게시판"
          />
          <OptionButtonComponent
            handleClickOption={handleClickOption}
            isMap={false}
          />
          <BulletinListContainer>
            {allOrders?.length === 0 ? (
              <BulletinList $noOrder>
                <BulletinListInfoText>
                  당일 주문이 존재하지 않습니다.
                </BulletinListInfoText>
              </BulletinList>
            ) : (
              allOrders?.map(order => (
                <BulletinList key={order.id} $noOrder={false}>
                  <BulletinListTitle>{order.name}</BulletinListTitle>
                  <BulletinListInfoContainer>
                    <BulletinListInfoText>
                      {order.placeName}
                    </BulletinListInfoText>
                    <BulletinListInfoText>
                      {formatDateTime(order.orderTime)}
                    </BulletinListInfoText>
                    <BulletinListInfoText>
                      {order.memberNickName}
                    </BulletinListInfoText>
                  </BulletinListInfoContainer>
                </BulletinList>
              ))
            )}
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
        </>
      )}
    </BulletinWrapper>
  );
}
