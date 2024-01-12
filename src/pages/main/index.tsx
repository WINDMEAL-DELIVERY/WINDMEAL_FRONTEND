import BottomTab from '@/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import Map from '@/components/map';
import BottomSheet from '@/components/bottom-sheet';

export default function main() {
  return (
    <Wrapper>
      <Map />
      <BottomSheet />
      <BottomTab />
    </Wrapper>
  );
}
