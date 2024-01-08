import BottomTab from '@/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import CardView from '@/components/card-view';
import Map from '@/components/map';
import { useTokenInitialization } from '@hooks/useTokenInitialization';

export default function Main() {
  // 토큰 재할당 및 FCM 구독
  useTokenInitialization();
  return (
    <Wrapper>
      <CardView />
      <Map />
      <BottomTab />
    </Wrapper>
  );
}
