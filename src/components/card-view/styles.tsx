import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  //   height: 7.13rem;
`;

export const ListNumberText = styled.p`
  color: var(--MainText, #1f1f1f);
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.025rem;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`;

export const DeliveryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨김 */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  max-height: 50vh; //차후 변경
`;

export const DeliveryTitle = styled.h2`
  color: white;
  margin-bottom: 0.6rem;
  margin-left: 1rem;
  font-weight: bold;
`;

export const NoDeliveryText = styled.h2`
  font-weight: bold;
`;

export const DeliveryCard = styled.div`
  margin-bottom: 1rem;
  background-color: rgb(200, 200, 200);
  display: flex;
  flex-direction: column;
  height: 18rem;
  border-radius: 2rem;
  justify-content: center;
  align-items: center;
`;

export const DeliveryCardContent = styled.div`
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

export const DeliveryMenu = styled.p``;

export const DeliveryStart = styled.p``;

export const DeliveryEnd = styled.p``;

export const DeliveryState = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DeliveryCustomerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DeliveryCustomer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.4rem;
`;

export const DeliveryCustomerImg = styled.img`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-right: auto;
  margin-left: auto;
  margin-top: auto;
`;
