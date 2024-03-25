import PageHeader from '@/components/header';
import OptionButtonComponent from '@/components/option-button-container';
import Seo from '@/components/seo';
import { DeliveredListPageWrapper } from '@/styles/mylistStyles';
import { useRouter } from 'next/router';
import { IconCart, IconHome } from 'public/svgs';

export default function DeliveredList() {
  const router = useRouter();

  const handleClickOption = () => {};

  return (
    <DeliveredListPageWrapper>
      <Seo
        title="배달한 리스트"
        description="본인이 배달했던 내역 리스트를 필터링해서 확인할 수 있습니다."
      />
      <PageHeader
        icon1={<IconHome fill="#1F1F1F" onClick={() => router.push('/main')} />}
        icon2={<IconCart fill="#1F1F1F" />}
        title="게시판"
      />
      <OptionButtonComponent
        handleClickOption={handleClickOption}
        isMap={false}
      />
    </DeliveredListPageWrapper>
  );
}
