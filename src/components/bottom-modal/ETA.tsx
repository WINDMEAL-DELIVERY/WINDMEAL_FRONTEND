import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionTitle,
} from '@components/bottom-modal/styles';

export default function ETA() {
  return (
    <MapOptionContainer>
      <MapOptionTitle>도착시간</MapOptionTitle>
      <MapOptionDescription>
        조회하고싶은 도착 시간을 선택하세요.
      </MapOptionDescription>
    </MapOptionContainer>
  );
}
