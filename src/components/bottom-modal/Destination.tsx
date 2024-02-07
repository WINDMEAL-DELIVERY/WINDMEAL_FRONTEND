import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionList,
  MapOptionListContainer,
  MapOptionTitle,
} from '@components/bottom-modal/styles';

export default function Destination() {
  return (
    <>
      <MapOptionContainer>
        <MapOptionTitle>배달지</MapOptionTitle>
        <MapOptionDescription>
          조회하고 싶은 도착지를 선택하세요.
        </MapOptionDescription>
      </MapOptionContainer>
      <MapOptionListContainer>
        <MapOptionList>비전타워</MapOptionList>
        <MapOptionList>가천관</MapOptionList>
        <MapOptionList>기숙사</MapOptionList>
      </MapOptionListContainer>
    </>
  );
}
