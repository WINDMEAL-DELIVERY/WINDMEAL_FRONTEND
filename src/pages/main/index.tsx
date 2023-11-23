import BottomTab from '@/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import CardView from '@/components/card-view';
import Map from '@/components/map';

export default function main() {
  return (
    <Wrapper>
      <CardView />
      <Map />
      <BottomTab />
    </Wrapper>
  );
}
