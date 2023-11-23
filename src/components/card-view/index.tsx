import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeliveryCard = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 5px;
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
    },
  ]);
  return (
    <CardContainer>
      <div>
        <h2>배달 중 목록</h2>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {deliveries.map(delivery => (
            <DeliveryCard key={delivery.id}>
              <h3>{delivery.storeName}</h3>
              <p>출발지: {delivery.storeName}</p>
              <p>도착지: {delivery.destination}</p>
              <p>주문자 닉네임: {delivery.customerName}</p>
              <MenuList>
                {delivery.menus.map((menu, index) => (
                  <MenuItem key={index}>{menu.menuName}</MenuItem>
                ))}
              </MenuList>
              <button>채팅하기</button>
            </DeliveryCard>
          ))}
        </div>
      </div>
      <div>
        <h2>요청 목록</h2>
        {/* 여기에 요청 목록 컴포넌트 추가 */}
      </div>
    </CardContainer>
  );
}
