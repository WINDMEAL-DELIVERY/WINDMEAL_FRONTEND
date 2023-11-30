import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';

export default function CMSStore() {
  const router = useRouter();
  const { id: storeId } = router.query;

  return (
    <Wrapper>
      <BottomTab />
    </Wrapper>
  );
}
