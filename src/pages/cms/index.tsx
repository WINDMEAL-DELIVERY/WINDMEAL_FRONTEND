import { getStoreList } from '@/apis/cms-store/store';
import { StoreListProps } from '@/types/type';
import { useState } from 'react';
import { Card, Spacer } from '@geist-ui/react';
import {
  CMSWrapper,
  ReportContainer,
  StoreContainer,
  StyledText,
} from '@/styles/cmsStyles';
import { useRouter } from 'next/router';
import AddStore from '@/components/add-store';
import { useQuery } from 'react-query';
import { IconPlace } from 'public/svgs';
import FloatingHomeButton from '@/components/floating-home-button';
import Seo from '@/components/seo';

export default function CMS() {
  const [storeList, setStoreList] = useState<StoreListProps[]>([]);
  const router = useRouter();

  useQuery<StoreListProps[]>(
    ['storeList'],
    async () => {
      const { data } = await getStoreList();
      return data.content;
    },
    {
      onSuccess: stores => {
        console.log('response1', stores);
        setStoreList(stores);
      },
      onError: err => console.log('!!', err),
    },
  );

  const handleClickStore = (id: number) => {
    router.push(`/cms/${id}`);
  };

  return (
    <CMSWrapper>
      <div>CMS</div>
      <Seo
        title="CMS"
        description="가게 및 메뉴를 관리할 수 있는 관리자 페이지입니다."
      />
      <Card>
        <StoreContainer>
          {storeList.map(store => (
            <StyledText
              key={store.storeId}
              onClick={() => handleClickStore(store.storeId)}
            >
              {store.name}
            </StyledText>
          ))}
        </StoreContainer>
      </Card>
      <AddStore />
      <Spacer style={{ marginTop: '2rem' }} />
      <ReportContainer>
        <IconPlace />
        <StyledText onClick={() => router.push(`/cms/report`)}>
          REPORT
        </StyledText>
      </ReportContainer>
      <FloatingHomeButton />
    </CMSWrapper>
  );
}
