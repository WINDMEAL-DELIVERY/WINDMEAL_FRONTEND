import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionList,
  MapOptionListContainer,
  MapOptionTitle,
} from '@components/bottom-modal/styles';

export default function StoreType() {
  return (
    <>
      <MapOptionContainer>
        <MapOptionTitle>가게 종류</MapOptionTitle>
        <MapOptionDescription>
          조회하고 싶은 가게의 종류를 선택하세요.
        </MapOptionDescription>
      </MapOptionContainer>
      <MapOptionListContainer>
        <MapOptionList>음식점</MapOptionList>
        <MapOptionList>카페</MapOptionList>
        <MapOptionList>의약품</MapOptionList>
      </MapOptionListContainer>
    </>
  );
}
