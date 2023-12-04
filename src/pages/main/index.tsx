import BottomTab from '@/components/bottom-tab';
import { Wrapper } from '@styles/styles';
import Link from 'next/link';
import CardView from '@/components/card-view';
import Map from '@/components/map';

export default function main() {
  return (
    <Wrapper>
      <CardView />
      <Map />
      <Link href="/cms">CMS</Link>
      <BottomTab />
    </Wrapper>
  );
}
