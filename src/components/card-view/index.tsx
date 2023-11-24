/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import tempImg from '../../../public/kakao.png';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgb(70, 70, 70);
  justify-content: space-around;
  align-items: center;
  height: 25rem;
`;

const DeliveryContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 1.5rem;
`;

const DeliveryTitle = styled.h2`
  color: white;
  margin-bottom: 0.6rem;
  margin-left: 1rem;
  font-weight: bold;
`;

const NoDeliveryText = styled.h2`
  font-weight: bold;
`;

const DeliveryCard = styled.div`
  margin-bottom: 1rem;
  background-color: rgb(200, 200, 200);
  display: flex;
  flex-direction: column;
  height: 18rem;
  border-radius: 2rem;
  justify-content: center;
  align-items: center;
`;

const DeliveryCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 85%;
  > * {
    margin-bottom: 1rem; /* 자식 요소들 간에 하단 여백 */
    &:last-child {
      margin-bottom: 0; /* 마지막 자식에는 여백을 주지 않음 */
    }
  }
`;

const DeliveryMenu = styled.p``;

const DeliveryStart = styled.p``;

const DeliveryEnd = styled.p``;

const DeliveryState = styled.div`
  display: flex;
  flex-direction: row;
`;

const DeliveryCustomerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DeliveryCustomer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.4rem;
`;

const DeliveryCustomerImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-right: auto;
  margin-left: auto;
  margin-top: auto;
`;

interface Menu {
  menuName: string;
}

interface Delivery {
  id: number;
  menus: Menu[];
  storeName: string;
  destination: string;
  customerName: string;
  customerImg: string;
  status: string;
}

export default function CardView() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      menus: [
        {
          menuName: '아이스아메리카노',
        },
        {
          menuName: '마카롱',
        },
      ],
      storeName: '컴포즈 커피',
      destination: 'AI 공학관',
      customerName: '주문자1',
      customerImg: './kakao.png',
      status: '배달중',
    },
    {
      id: 2,
      menus: [
        {
          menuName: '아이스아메리카노2',
        },
        {
          menuName: '마카롱',
        },
      ],
      storeName: '컴포즈 커피',
      destination: 'AI 공학관',
      customerName: '주문자1',
      customerImg: './kakao.png',
      status: '배달중',
    },
    {
      id: 3,
      menus: [
        {
          menuName: '아이스아메리카노3',
        },
        {
          menuName: '마카롱',
        },
      ],
      storeName: '컴포즈 커피',
      destination: 'AI 공학관',
      customerName: '주문자1',
      customerImg: './kakao.png',
      status: '배달중',
    },
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 보여질 슬라이드 개수
    slidesToScroll: 1, // 스크롤 시 이동할 슬라이드 개수
    arrows: false,
  };

  return (
    <CardContainer>
      <DeliveryContainer>
        <DeliveryTitle>배달중 목록</DeliveryTitle>
        {deliveries.length > 0 ? (
          <Slider {...settings}>
            {deliveries.map(delivery => (
              <DeliveryCard key={delivery.id}>
                <DeliveryCardContent>
                  <DeliveryMenu>{delivery.menus[0].menuName}</DeliveryMenu>
                  <DeliveryStart>{delivery.storeName}</DeliveryStart>
                  <DeliveryState>
                    <p>⇣ {delivery.status}</p>
                  </DeliveryState>
                  <DeliveryEnd>{delivery.destination}</DeliveryEnd>
                  <DeliveryCustomerWrapper>
                    <DeliveryCustomerImg
                      alt="사용자 프로필"
                      src={delivery.customerImg}
                    />
                    <DeliveryCustomer>{delivery.customerName}</DeliveryCustomer>
                  </DeliveryCustomerWrapper>
                  <ButtonContainer>
                    <button type="button">채팅하기</button>
                    <button type="button">게시글 상세</button>
                  </ButtonContainer>
                </DeliveryCardContent>
              </DeliveryCard>
            ))}
          </Slider>
        ) : (
          <DeliveryCard>
            <DeliveryCardContent>
              <NoDeliveryText>배달중인 목록이 없습니다.</NoDeliveryText>
            </DeliveryCardContent>
          </DeliveryCard>
        )}
      </DeliveryContainer>
      <DeliveryContainer>
        <DeliveryTitle>요청 목록</DeliveryTitle>
        {deliveries.length > 0 ? (
          <Slider {...settings}>
            {deliveries.map(delivery => (
              <DeliveryCard key={delivery.id}>
                <DeliveryCardContent>
                  <DeliveryMenu>{delivery.menus[0].menuName}</DeliveryMenu>
                  <DeliveryStart>{delivery.storeName}</DeliveryStart>
                  <DeliveryState>
                    <p>⇣ {delivery.status}</p>
                  </DeliveryState>
                  <DeliveryEnd>{delivery.destination}</DeliveryEnd>
                  <DeliveryCustomerWrapper>
                    <DeliveryCustomerImg
                      alt="사용자 프로필"
                      src={delivery.customerImg}
                    />
                    <DeliveryCustomer>{delivery.customerName}</DeliveryCustomer>
                  </DeliveryCustomerWrapper>
                  <ButtonContainer>
                    <button type="button">채팅하기</button>
                    <button type="button">게시글 상세</button>
                  </ButtonContainer>
                </DeliveryCardContent>
              </DeliveryCard>
            ))}
          </Slider>
        ) : (
          <DeliveryCard>
            <DeliveryCardContent>
              <NoDeliveryText>요청중인 목록이 없습니다.</NoDeliveryText>
            </DeliveryCardContent>
          </DeliveryCard>
        )}
      </DeliveryContainer>
    </CardContainer>
  );
}
