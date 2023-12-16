import { getStoreList } from '@/apis/store/store';
import { StoreListProps } from '@/types/type';
import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useEffect, useState } from 'react';
import { Card } from '@geist-ui/react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import { useRouter } from 'next/router';
import AddStore from '@/components/add-store';
import { useMutation, useQuery } from 'react-query';

export default function CMS() {
  const [storeList, setStoreList] = useState<StoreListProps[]>([]);
  const router = useRouter();

  const { data: stores } = useQuery<StoreListProps[]>(
    ['storeList'],
    async () => {
      const { data } = await getStoreList();
      return data.content;
    },
    {
      onSuccess: () => {
        console.log('response1', stores);
      },
      onError: err => console.log('!!', err),
    },
  );

  useEffect(() => {
    console.log('response2', stores);
    if (stores) setStoreList(stores);
  }, [stores]);

  const handleClickStore = (id: number) => {
    router.push(`/cms/${id}`);
  };

  const handleAddStore = (newStore: StoreListProps) => {
    setStoreList(prev => [...prev, newStore]);
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
      <AddStore handleAddStore={handleAddStore} />
      <BottomTab />
    </Wrapper>
  );
}
