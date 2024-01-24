// import { getMyDelivery, getMyOrder } from '@/apis/delievery/delievery';
import { Delivery } from '@/types/type';
import {
  CardContainer,
  DeliveryContainer,
  DeliveryCard,
  DeliveryCardContent,
  DeliveryMenu,
  DeliveryCustomerWrapper,
  DeliveryCustomerImg,
  DeliveryCustomer,
  NoDeliveryText,
  ListNumberText,
  UpperContainer,
  CustomerMenuWrapper,
  DeliveryPlaceWrapper,
  DeliveryPlace,
  DeliveryPlaceText,
  DeliveryPlaceTextWrapper,
} from '@components/card-view/styles';
import ToggleButton from '@components/toggle-button';
import { IconChatting, IconMiddle, IconPlace, IconRight } from 'public/svgs';
import { useState } from 'react';

export default function CardView() {
  const [deliveries] = useState<Delivery[]>([
    {
      deliveryId: 1,
      orderId: 1,
      deliveryStatus: '배달 중',
      summary: '불닭 마요 덮밥 외 1개 2000원',
      description: '지하 1층 소웨 과실로 와주세요',
      destinationName: '가천대학교',
      nickName: '임동동',
      storeName: '신의한컵',
    },
    {
      deliveryId: 2,
      orderId: 2,
      deliveryStatus: '배달 중',
      summary: '불닭 마요 덮밥 외 2개 2000원',
      description: '지하 1층 소웨 과실로 와주세요',
      destinationName: '가천대학교',
      nickName: '임동동',
      storeName: '신의한컵',
    },
    {
      deliveryId: 3,
      orderId: 3,
      deliveryStatus: '배달 중',
      summary: '불닭 마요 덮밥 외 3개 2000원',
      description: '지하 1층 소웨 과실로 와주세요',
      destinationName: '가천대학교',
      nickName: '임동동',
      storeName: '신의한컵',
    },
  ]);

  const handleClickMenu = () => {}; // 게시글 상세로 이동

  const handleClickChatting = () => {}; // 해당 채팅창으로 이동

  return (
    <CardContainer>
      <UpperContainer>
        <ToggleButton />
        <ListNumberText>전체 리스트 {deliveries.length}</ListNumberText>
      </UpperContainer>
      <DeliveryContainer>
        {deliveries.length > 0 ? (
          deliveries.map(delivery => (
            <DeliveryCard key={delivery.deliveryId}>
              <DeliveryCardContent>
                <DeliveryCustomerWrapper>
                  <DeliveryCustomerImg
                    src="./kakao.png"
                    onClick={handleClickChatting}
                  />
                  <CustomerMenuWrapper>
                    <DeliveryCustomer>
                      {delivery.nickName}&nbsp;{' '}
                      <IconChatting onClick={handleClickChatting} />
                    </DeliveryCustomer>
                    <DeliveryMenu onClick={handleClickMenu}>
                      {delivery.summary}&nbsp; <IconRight />
                    </DeliveryMenu>
                  </CustomerMenuWrapper>
                </DeliveryCustomerWrapper>
                <DeliveryPlaceWrapper>
                  <IconPlace />
                  <DeliveryPlaceTextWrapper>
                    <DeliveryPlaceText>출발지</DeliveryPlaceText>
                    <DeliveryPlace>{delivery.storeName}</DeliveryPlace>
                  </DeliveryPlaceTextWrapper>
                </DeliveryPlaceWrapper>
                <IconMiddle style={{ marginLeft: '1rem' }} />
                <DeliveryPlaceWrapper>
                  <IconPlace />
                  <DeliveryPlaceTextWrapper>
                    <DeliveryPlaceText>도착지</DeliveryPlaceText>
                    <DeliveryPlace>{delivery.destinationName}</DeliveryPlace>
                  </DeliveryPlaceTextWrapper>
                </DeliveryPlaceWrapper>
              </DeliveryCardContent>
            </DeliveryCard>
          ))
        ) : (
          <DeliveryCard>
            <DeliveryCardContent>
              <NoDeliveryText>배달중인 목록이 없습니다.</NoDeliveryText>
            </DeliveryCardContent>
          </DeliveryCard>
        )}
      </DeliveryContainer>
    </CardContainer>
  );
}
