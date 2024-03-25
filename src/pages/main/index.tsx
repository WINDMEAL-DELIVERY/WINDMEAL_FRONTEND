import BottomTab from '@/components/bottom-tab';
import { BottomSheetContainer, Wrapper } from '@styles/styles';
import Map from '@/components/map';
import { useTokenInitialization } from '@hooks/useTokenInitialization';
import { useSetFCM } from '@hooks/useSetFCM';
import { useGetMessageFCM } from '@hooks/useGetMessageFCM';
import BottomSheet from '@/components/bottom-sheet';
import Seo from '@/components/seo';

export default function Main() {
  // 토큰 재할당 및 FCM 구독
  useTokenInitialization();
  // 유저 알람 토큰 요청 및 서버 발송
  useSetFCM();
  // 알림 수신 확인
  useGetMessageFCM();
  return (
    <Wrapper>
      <Seo
        title="메인 페이지"
        description="가게 및 요청 정보를 필터링 하여 확인하실 수 있습니다."
      />
      <Map />
      <BottomSheetContainer>
        <BottomSheet />
      </BottomSheetContainer>
      <BottomTab />
    </Wrapper>
  );
}
