import { getStoreList } from '@/api/cms';
import { storeListProps } from '@/types/type';
import AddFile from '@components/AddFile';
import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useEffect, useState } from 'react';
import { Card } from '@geist-ui/react';
import { StoreContainer, StyledText } from '@pages/cms/styles';

export default function CMS() {
  const [storeList, setStoreList] = useState<storeListProps[]>([]);
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

  const handleClickStore = () => {};

  return (
    <Wrapper>
      <div>CMS</div>
      <Card>
        <StoreContainer>
          {storeList.map(store => (
            <StyledText key={store.id} onClick={handleClickStore}>
              {store.name}
            </StyledText>
          ))}
        </StoreContainer>
      </Card>
      <AddFile />
      <BottomTab />
    </Wrapper>
  );
}
