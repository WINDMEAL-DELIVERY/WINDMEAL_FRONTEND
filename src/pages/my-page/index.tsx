import BottomTab from '@components/bottom-tab';
import {
  ProfileImageFrame,
  ProfileImage,
  HeaderBar,
  GoBack,
  Cart,
  Title,
  ProfileFrame,
  ProfileInfoFrame,
  DeliveredListFrame,
  DeliveredList,
  PriceFrame,
  Price,
  OrderDetailListFrame,
  OrderDetailList,
  Withdrawal,
  WithdrawalFrame,
} from '@pages/my-page/styles';
import { Wrapper } from '@styles/styles';

export default function MyPage() {
  return (
    <Wrapper>
      <HeaderBar>
        <GoBack type="button">뒤로가기</GoBack>
        <Title>마이 페이지</Title>
        <Cart type="button">장바구니</Cart>
      </HeaderBar>
      <ProfileFrame>
        <ProfileImageFrame>
          <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
        </ProfileImageFrame>
        <ProfileInfoFrame>
          <span>이름</span>
          <span>학과</span>
          <span>닉네임</span>
        </ProfileInfoFrame>
      </ProfileFrame>
      <DeliveredListFrame>
        <DeliveredList type="button">배달한 리스트</DeliveredList>
        <PriceFrame>
          약 <Price>3,000</Price>원
        </PriceFrame>
        <span>배달해서 번 수익</span>
      </DeliveredListFrame>
      <OrderDetailListFrame>
        <OrderDetailList type="button">주문 내역 리스트</OrderDetailList>
        <PriceFrame>
          약<Price>3,000</Price>원 더 저렴하게 이용했어요!
        </PriceFrame>
      </OrderDetailListFrame>
      <WithdrawalFrame>
        <Withdrawal type="button">회원 탈퇴</Withdrawal>
      </WithdrawalFrame>
      <BottomTab />
    </Wrapper>
  );
}
