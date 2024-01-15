/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Delivery } from '@/types/type';
import {
  CardContainer,
  DeliveryContainer,
  DeliveryTitle,
  DeliveryCard,
  DeliveryCardContent,
  DeliveryMenu,
  DeliveryStart,
  DeliveryState,
  DeliveryEnd,
  DeliveryCustomerWrapper,
  DeliveryCustomerImg,
  DeliveryCustomer,
  ButtonContainer,
  NoDeliveryText,
} from '@components/card-view/styles';

export default function CardView() {
  const [deliveries] = useState<Delivery[]>([
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
