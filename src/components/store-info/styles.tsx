import styled from 'styled-components';

export const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StoreTopContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 0.25rem;
`;

export const StoreSecondContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 0.4rem;
`;

export const StoreImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f2f4ff;
  width: 20.5rem;
  height: 5.9rem;

  margin-bottom: 1rem;
`;

export const StoreButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 20.5rem;
`;

export const StoreName = styled.p`
  stylename: SubMainB;
  font-family: Noto Sans KR;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4rem;
  letter-spacing: -0.025em;
  text-align: center;
  color: #5776b9;
`;

export const StoreIsOpen = styled.p`
  font-family: Noto Sans KR;
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.1rem;
  letter-spacing: -0.025em;
  text-align: center;

  color: #ed1c24; //

  margin-right: 0.4rem;
`;

export const StoreTime = styled.p`
  font-family: Noto Sans KR;
  font-size: 0.86rem;
  font-weight: 500;
  line-height: 1.1rem;
  letter-spacing: -0.025em;
  text-align: left;

  color: #1f1f1f;
`;

export const DeliveryButton = styled.button`
  width: 9.1rem;
  height: 2.6rem;
  background-color: #ffffff;
  border-radius: 20px;
  border: 0.5px solid #5776b9;
`;

export const DeliveryButtonText = styled.span`
  font-family: Noto Sans KR;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.025em;
  text-align: center;

  color: #5776b9;
`;

export const OrderButton = styled.button`
  width: 9.1rem;
  height: 2.6rem;
  background-color: #5776b9;
  border-radius: 20px;
  border: 0.5px solid #5776b9;
`;

export const OrderButtonText = styled.span`
  font-family: Noto Sans KR;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.025em;
  text-align: center;

  color: #ffffff;
`;
