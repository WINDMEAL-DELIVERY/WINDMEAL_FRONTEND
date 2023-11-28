import BottomTab from 'src/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import Link from 'next/link';
import Map from '../../components/map';

export default function main() {
  return (
    <Wrapper>
      <Map />
      <Link href="/cms">CMS</Link>
      <BottomTab />
    </Wrapper>
  );
}
