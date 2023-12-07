import { getStoreList } from '@/api/cms';
import { StoreListProps } from '@/types/type';
import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useEffect, useState } from 'react';
import { Card } from '@geist-ui/react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import { useRouter } from 'next/router';
import AddStore from '@/components/add-store';

export default function CMS() {
  const [storeList, setStoreList] = useState<StoreListProps[]>([]);
  const router = useRouter();

  const fetchAllStores = async () => {
    try {
      const {
        data: { content },
      } = await getStoreList();
      console.log('storelist', content);
      setStoreList(content);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    fetchAllStores();
  }, []);

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
