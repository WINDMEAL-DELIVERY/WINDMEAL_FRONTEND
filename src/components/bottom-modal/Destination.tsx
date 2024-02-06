import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionTitle,
} from '@components/bottom-modal/styles';

export default function Destination() {
  return (
    <MapOptionContainer>
      <MapOptionTitle>배달지</MapOptionTitle>
      <MapOptionDescription>
        조회하고싶은 도착지를 선택하세요.
      </MapOptionDescription>
    </MapOptionContainer>
  );
}
