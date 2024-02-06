import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionTitle,
} from '@components/bottom-modal/styles';

export default function StoreType() {
  return (
    <MapOptionContainer>
      <MapOptionTitle>가게 종류</MapOptionTitle>
      <MapOptionDescription>
        조회하고싶은 가게의 종류를 선택하세요.
      </MapOptionDescription>
    </MapOptionContainer>
  );
}
