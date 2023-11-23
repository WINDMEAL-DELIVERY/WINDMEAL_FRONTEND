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
  background-color: grey;
  justify-content: space-around;
`;

const DeliveryContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: 1.5rem;
`;

const DeliveryTitle = styled.h3`
  color: white;
`;

const DeliveryCard = styled.div`
  margin-bottom: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const DeliveryMenu = styled.p``;

const DeliveryStart = styled.p``;

const DeliveryEnd = styled.p``;

const DeliveryState = styled.div`
  display: flex;
  flex-direction: row;
`;

const DeliveryCustomer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DeliveryCustomerImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
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
        <Slider {...settings}>
          {deliveries.map(delivery => (
            <DeliveryCard key={delivery.id}>
              <DeliveryMenu>{delivery.menus[0].menuName}</DeliveryMenu>
              <DeliveryStart>{delivery.storeName}</DeliveryStart>
              <DeliveryState>
                <p>⇣ {delivery.status}</p>
              </DeliveryState>
              <DeliveryEnd>{delivery.destination}</DeliveryEnd>
              <DeliveryCustomer>
                <DeliveryCustomerImg alt="22" src={delivery.customerImg} />
                <DeliveryCustomer>{delivery.customerName}</DeliveryCustomer>
              </DeliveryCustomer>
              <ButtonContainer>
                <button type="button">채팅하기</button>
                <button type="button">게시글 상세</button>
              </ButtonContainer>
            </DeliveryCard>
          ))}
        </Slider>
      </DeliveryContainer>
      <DeliveryContainer>
        <DeliveryTitle>요청 목록</DeliveryTitle>
        <Slider {...settings}>
          {deliveries.map(delivery => (
            <DeliveryCard key={delivery.id}>
              <DeliveryMenu>{delivery.menus[0].menuName}</DeliveryMenu>
              <DeliveryStart>{delivery.storeName}</DeliveryStart>
              <DeliveryState>
                <p>⇣ {delivery.status}</p>
              </DeliveryState>
              <DeliveryEnd>{delivery.destination}</DeliveryEnd>
              <DeliveryCustomer>
                <DeliveryCustomerImg alt="22" src={delivery.customerImg} />
                <DeliveryCustomer>{delivery.customerName}</DeliveryCustomer>
              </DeliveryCustomer>
              <ButtonContainer>
                <button type="button">채팅하기</button>
                <button type="button">게시글 상세</button>
              </ButtonContainer>
            </DeliveryCard>
          ))}
        </Slider>
      </DeliveryContainer>
    </CardContainer>
  );
}
