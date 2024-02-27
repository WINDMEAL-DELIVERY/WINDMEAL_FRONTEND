import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionList,
  MapOptionListContainer,
  MapOptionTitle,
  MapOptionWrapper,
} from '@components/bottom-modal/styles';
import { useMemo } from 'react';
import { building } from '@/constants/building';
import { StoreTypeInterface } from '@/types/type';

export default function Destination({ submitOption }: StoreTypeInterface) {
  const buildingOptions = useMemo(() => {
    // building 객체의 키와 값을 배열 형태로 변환하여 반환
    return Object.entries(building).map(([name, id]) => ({ name, id }));
  }, []);

  return (
    <MapOptionWrapper>
      <MapOptionContainer>
        <MapOptionTitle>배달지</MapOptionTitle>
        <MapOptionDescription>
          조회하고 싶은 도착지를 선택하세요.
        </MapOptionDescription>
      </MapOptionContainer>
      <MapOptionListContainer $hideScrollbar>
        {buildingOptions.map(buildingOption => (
          <MapOptionList
            key={buildingOption.id}
            onClick={() => submitOption({ placeId: buildingOption.id })}
          >
            {buildingOption.name}
          </MapOptionList>
        ))}
      </MapOptionListContainer>
    </MapOptionWrapper>
  );
}
