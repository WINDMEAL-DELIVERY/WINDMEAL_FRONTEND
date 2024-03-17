import BottomTab from '@/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import Map from '@/components/map';
import { useTokenInitialization } from '@hooks/useTokenInitialization';
import { useSetFCM } from '@hooks/useSetFCM';
import { useGetMessageFCM } from '@hooks/useGetMessageFCM';
import BottomSheet from '@/components/bottom-sheet';

export default function Main() {
  // 토큰 재할당 및 FCM 구독
  useTokenInitialization();
  // 유저 알람 토큰 요청 및 서버 발송
  useSetFCM();
  // 알림 수신 확인
  useGetMessageFCM();
  return (
    <Wrapper>
      <Map />
      <BottomSheet />
      <BottomTab />
    </Wrapper>
  );
}
