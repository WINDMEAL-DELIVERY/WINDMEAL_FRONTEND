import { getStoreInfo } from '@/apis/store/store';
import { StoreIdProp } from '@/types/type';
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
  StoreImg,
} from '@components/store-info/styles';
import { useQuery } from 'react-query';
import defaultImg from 'public/kakao.png';
import { useState } from 'react';

export default function StoreInfo({ storeId }: StoreIdProp) {
  const { data: storeInfo, isLoading } = useQuery(
    ['storeInfo'],
    async () => {
      const { data } = await getStoreInfo(storeId);
      return data;
    },
    {
      onSuccess: storeInformation => {
        console.log('해당 가게 정보', storeInformation);
      },
      onError: err => console.log('error', err),
    },
  );

  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <StoreInfoContainer>
      {isLoading ? (
        <>로딩 중</>
      ) : (
        <>
          <StoreTopContainer>
            <StoreName>{storeInfo.name}</StoreName>
          </StoreTopContainer>
          <StoreSecondContainer>
            <StoreIsOpen>
              {storeInfo.isOpen ? '영업 중' : '영업 전'}
            </StoreIsOpen>
            <StoreTime>
              {storeInfo.isOpen
                ? `${storeInfo.closeTime.slice(0, 5)}에 영업 종료`
                : `${storeInfo.openTime.slice(0, 5)}에 영업 시작`}
            </StoreTime>
          </StoreSecondContainer>
          <StoreImgContainer>
            <StoreImg
              src={
                isImgError
                  ? defaultImg
                  : `${process.env.NEXT_PUBLIC_IMAGE_URL}${storeInfo.photo}`
              }
              onError={() => setIsImgError(true)}
              alt="image"
              layout="fixed"
              width={3}
              height={3}
            />
          </StoreImgContainer>
          <StoreButtonContainer>
            <DeliveryButton>
              <DeliveryButtonText>배달하기</DeliveryButtonText>
            </DeliveryButton>
            <OrderButton>
              <OrderButtonText>주문하기</OrderButtonText>
            </OrderButton>
          </StoreButtonContainer>
        </>
      )}
    </StoreInfoContainer>
  );
}
