import { StoreTypeInterface } from '@/types/type';
import {
  ApplyButton,
  ApplyButtonText,
  MapOptionContainer,
  MapOptionDescription,
  MapOptionTitle,
  TimePickerContainer,
} from '@components/bottom-modal/styles';
import TimePicker from '@components/time-picker';
import { useState } from 'react';

export default function ETA({ submitOption }: StoreTypeInterface) {
  const [hour, setHour] = useState<string>('');
  const [minute, setMinute] = useState<string>('');
  const [isDay, setIsDay] = useState<string>('');

  const handleSelectHour = (h: string | number) => {
    setHour(String(h));
  };

  const handleSelectMinute = (m: string | number) => {
    setMinute(String(m));
  };

  const handleSelectIsDay = (ampm: string | number) => {
    setIsDay(String(ampm));
  };

  const handleApply = () => {
    let newHour = hour;
    let newMinute = minute;
    if (isDay === 'PM') newHour = String(Number(hour) + 12);
    if (hour.length === 1) newHour = newHour.padStart(2, '0');
    if (minute.length === 1) newMinute = newMinute.padStart(2, '0');
    if (newHour === '24') newHour = '00';
    const time = `${newHour}:${newMinute}:00`;
    submitOption({ eta: time });
  };

  return (
    <>
      <MapOptionContainer>
        <MapOptionTitle>도착시간</MapOptionTitle>
        <MapOptionDescription>
          조회하고 싶은 도착 시간을 선택하세요.
        </MapOptionDescription>
      </MapOptionContainer>
      <TimePickerContainer>
        <TimePicker
          list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          onSelectedChange={handleSelectHour}
        />
        <TimePicker
          list={[0, 10, 20, 30, 40, 50]}
          onSelectedChange={handleSelectMinute}
        />
        <TimePicker list={['AM', 'PM']} onSelectedChange={handleSelectIsDay} />
      </TimePickerContainer>
      <ApplyButton onClick={handleApply}>
        <ApplyButtonText>적용하기</ApplyButtonText>
      </ApplyButton>
    </>
  );
}
