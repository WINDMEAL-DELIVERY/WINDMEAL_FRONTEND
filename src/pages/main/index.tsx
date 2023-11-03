import BottomTab from 'src/components/bottom-tab';
import { Wrapper } from '@pages/main/styles';
import Map from '../../components/map';

export default function main() {
  return (
    <Wrapper>
      <Map />
      <BottomTab />
    </Wrapper>
  );
}
