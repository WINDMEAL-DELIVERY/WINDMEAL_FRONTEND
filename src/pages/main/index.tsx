import BottomTab from 'src/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import Map from '../../components/map';

export default function main() {
  return (
    <Wrapper>
      <Map />
      <BottomTab />
    </Wrapper>
  );
}
