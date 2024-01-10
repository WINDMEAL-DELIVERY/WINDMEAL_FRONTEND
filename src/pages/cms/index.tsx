import { getStoreList } from '@/apis/store/store';
import { StoreListProps } from '@/types/type';
import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useState } from 'react';
import { Card, Spacer } from '@geist-ui/react';
import { StoreContainer, StyledText } from '@/styles/cmsStyles';
import { useRouter } from 'next/router';
import AddStore from '@/components/add-store';
import { useQuery } from 'react-query';

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
    <Wrapper>
      <div>CMS</div>
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
      <text onClick={() => router.push(`/cms/report`)}>REPORT</text>
      <BottomTab />
      <Spacer style={{ marginTop: '3rem' }} />
    </Wrapper>
  );
}
