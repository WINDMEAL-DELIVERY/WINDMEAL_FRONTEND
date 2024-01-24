import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;
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

export const NoDeliveryText = styled.h2`
  font-weight: bold;
`;

export const DeliveryCard = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  height: 18rem;
  // align-items: center;
  border-top: 2px solid #f2f4ff;
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

export const DeliveryMenu = styled.p`
  color: var(--SubText, #696e82);

  /* Sub */
  font-family: 'Noto Sans KR';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 1.09375rem */
  letter-spacing: -0.02188rem;
  cursor: pointer;
`;

export const DeliveryPlaceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DeliveryPlaceTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.7rem;
  line-height: normal;
`;

export const DeliveryPlaceText = styled.p`
  color: var(--MainColor, #5776b9);
  font-family: 'Open Sans';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DeliveryPlace = styled.p`
  color: var(--Grey, #061737);

  /* SubMain */
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.025rem;
`;

export const TempImg = styled.img`
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
`;

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

export const CustomerMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.7rem;
  line-height: normal;
`;

export const DeliveryCustomer = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--Grey, #061737);

  /* SubMain */
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.025rem;
`;

export const DeliveryCustomerImg = styled.img`
  border-radius: 50%;
  width: 3.125rem;
  height: 3.125rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-right: auto;
  margin-left: auto;
  margin-top: auto;
`;
