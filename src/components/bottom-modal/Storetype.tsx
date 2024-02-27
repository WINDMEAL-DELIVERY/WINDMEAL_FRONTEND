import { StoreTypeInterface } from '@/types/type';
import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionList,
  MapOptionListContainer,
  MapOptionTitle,
  MapOptionWrapper,
} from '@components/bottom-modal/styles';

export default function StoreType({ submitOption }: StoreTypeInterface) {
  return (
    <MapOptionWrapper>
      <MapOptionContainer>
        <MapOptionTitle>가게 종류</MapOptionTitle>
        <MapOptionDescription>
          조회하고 싶은 가게의 종류를 선택하세요.
        </MapOptionDescription>
      </MapOptionContainer>
      <MapOptionListContainer>
        <MapOptionList
          onClick={() => submitOption({ storeCategory: '음식점' })}
        >
          음식점
        </MapOptionList>
        <MapOptionList onClick={() => submitOption({ storeCategory: '카페' })}>
          카페
        </MapOptionList>
        <MapOptionList
          onClick={() => submitOption({ storeCategory: '의약품' })}
        >
          의약품
        </MapOptionList>
      </MapOptionListContainer>
    </MapOptionWrapper>
  );
}
