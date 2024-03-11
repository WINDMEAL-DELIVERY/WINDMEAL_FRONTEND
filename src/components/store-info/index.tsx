import { getStoreInfo } from '@/apis/store/store';
import { bulletinStoreState } from '@/states/bulletinOption';
import { mapStoreState } from '@/states/mapOption';
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
} from '@components/store-info/styles';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function StoreInfo({ storeId }: StoreIdProp) {
  const mapOption = useRecoilValue(mapStoreState);
  const [, setBulletinOption] = useRecoilState(bulletinStoreState);

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

  const router = useRouter();

  const handleClickDelivery = (storeID: number) => {
    router.push('/bulletin-board');
    setBulletinOption({
      storeId: storeID,
      placeId: mapOption.placeId,
      eta: mapOption.eta,
      storeCategory: mapOption.storeCategory,
    });
  };

  const handleClickOrder = (storeID: string) => {
    router.push({
      pathname: `/어디`,
      query: { storeId: storeID },
    });
  };

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
          <StoreImgContainer />
          <StoreButtonContainer>
            <DeliveryButton>
              <DeliveryButtonText
                onClick={() => handleClickDelivery(storeInfo.storeId)}
              >
                배달하기
              </DeliveryButtonText>
            </DeliveryButton>
            <OrderButton>
              <OrderButtonText
                onClick={() => handleClickOrder(storeInfo.storeId)}
              >
                주문하기
              </OrderButtonText>
            </OrderButton>
          </StoreButtonContainer>
        </>
      )}
    </StoreInfoContainer>
  );
}
