import { Delivery } from '@/types/type';
import {
  CardContainer,
  DeliveryContainer,
  DeliveryCard,
  DeliveryCardContent,
  DeliveryMenu,
  DeliveryStart,
  DeliveryState,
  DeliveryEnd,
  DeliveryCustomerWrapper,
  DeliveryCustomerImg,
  DeliveryCustomer,
  NoDeliveryText,
  ListNumberText,
  UpperContainer,
} from '@components/card-view/styles';
import ToggleButton from '@components/toggle-button';
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

  return (
    <CardContainer>
      <UpperContainer>
        <ToggleButton />
        <ListNumberText>전체 리스트 1</ListNumberText>
      </UpperContainer>
      <DeliveryContainer>
        {deliveries.length > 0 ? (
          deliveries.map(delivery => (
            <DeliveryCard key={delivery.deliveryId}>
              <DeliveryCardContent>
                <DeliveryMenu>{delivery.summary}</DeliveryMenu>
                <DeliveryStart>{delivery.storeName}</DeliveryStart>
                <DeliveryState>
                  <p>⇣ {delivery.deliveryStatus}</p>
                </DeliveryState>
                <DeliveryEnd>{delivery.destinationName}</DeliveryEnd>
                <DeliveryCustomerWrapper>
                  <DeliveryCustomerImg alt="사용자 프로필" src="./kakao.png" />
                  <DeliveryCustomer>{delivery.nickName}</DeliveryCustomer>
                </DeliveryCustomerWrapper>
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
