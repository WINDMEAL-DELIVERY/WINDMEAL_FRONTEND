import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionTitle,
  TimePickerContainer,
} from '@components/bottom-modal/styles';
import TimePicker from '../time-picker';

export default function ETA() {
  return (
    <>
      <MapOptionContainer>
        <MapOptionTitle>도착시간</MapOptionTitle>
        <MapOptionDescription>
          조회하고 싶은 도착 시간을 선택하세요.
        </MapOptionDescription>
      </MapOptionContainer>
      <TimePickerContainer>
        <TimePicker list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
        <TimePicker list={[0, 10, 20, 30, 40, 50]} />
        <TimePicker list={['AM', 'PM']} />
      </TimePickerContainer>
    </>
  );
}
