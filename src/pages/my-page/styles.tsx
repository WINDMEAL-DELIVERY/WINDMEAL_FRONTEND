import styled from 'styled-components';

export const HeaderBar = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  background-color: #f5f8faff;
  padding: 0 1.5% 0 1.5%;
`;

export const GoBack = styled.button`
  background-color: #f5f8faff;
  border: 0;
  cursor: pointer;
`;

export const Title = styled.span`
  font-weight: bold;
`;

export const Cart = styled.button`
  background-color: #f5f8faff;
  border: 0;
  cursor: pointer;
`;

export const ProfileFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 13rem;
  box-sizing: border-box;
  background-color: #f5f8faff;
  padding: 0 3% 0 10%;
`;
export const ProfileImageFrame = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f5f8faff;
  width: 7rem;
  height: 7rem;
`;

export const ProfileImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const ProfileInfoFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 3.3% 0 3.3% 3%;
  background-color: #f5f8faff;
  width: 30%;
  height: 50%;
  font-weight: bold;
`;

export const DeliveredListFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 13rem;
  background-color: #f5f8faff;
  box-sizing: border-box;
  padding: 0 10% 0 10%;
`;

export const DeliveredList = styled.button`
  background-color: #f5f8faff;
  text-align: left;
  padding: 0;
  cursor: pointer;
  border: 0;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  height: 15%;
`;

export const PriceFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30%;
`;

export const Price = styled.span`
  font-size: 2.3rem;
  font-weight: bold;
  margin-left: 3%;
`;

export const OrderDetailListFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 13rem;
  background-color: #f5f8faff;
  box-sizing: border-box;
  padding: 0 10% 0 10%;
`;

export const OrderDetailList = styled.button`
  background-color: #f5f8faff;
  text-align: left;
  padding: 0;
  cursor: pointer;
  border: 0;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  height: 15%;
`;

export const WithdrawalFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 5rem;
  background-color: #f5f8faff;
  box-sizing: border-box;
  padding: 0 10% 0 10%;
`;
export const Withdrawal = styled.button`
  background-color: #f5f8faff;
  text-align: left;
  padding: 0;
  cursor: pointer;
  border: 0;
  font-size: 1.2rem;
  font-weight: bold;
  width: 40%;
  height: 20%;
`;
