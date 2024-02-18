import {
  StoreInfoContainer,
  StoreTopContainer,
  StoreName,
  StoreSecondContainer,
  StoreIsOpen,
  StoreTime,
  StoreImgContainer,
  StoreButtonContainer,
  DeliveryButton,
  DeliveryButtonText,
  OrderButton,
  OrderButtonText,
} from '@components/store-info/styles';

export default function StoreInfo() {
  return (
    <StoreInfoContainer>
      <StoreTopContainer>
        <StoreName>컴포즈커피 가천대점</StoreName>
      </StoreTopContainer>
      <StoreSecondContainer>
        <StoreIsOpen>영업 전</StoreIsOpen>
        <StoreTime>11:00에 영업 시작</StoreTime>
      </StoreSecondContainer>
      <StoreImgContainer />
      <StoreButtonContainer>
        <DeliveryButton>
          <DeliveryButtonText>배달하기</DeliveryButtonText>
        </DeliveryButton>
        <OrderButton>
          <OrderButtonText>주문하기</OrderButtonText>
        </OrderButton>
      </StoreButtonContainer>
    </StoreInfoContainer>
  );
}
