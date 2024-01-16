import BottomTab from '@/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import Link from 'next/link';
import CardView from '@/components/card-view';
// import Map from '@/components/map';
import { useTokenInitialization } from '@hooks/useTokenInitialization';
import { useSetFCM } from '@hooks/useSetFCM';

export default function Main() {
  // 토큰 재할당 및 FCM 구독
  useTokenInitialization();
  // 유저 알람 토큰 요청 및 서버 발송
  useSetFCM();
  return (
    <Wrapper>
      <CardView />
      {/* <Map /> */}
      <span>CI/CD 테스트</span>
      <Link href="/cms">CMS</Link>
      <BottomTab />
    </Wrapper>
  );
}
