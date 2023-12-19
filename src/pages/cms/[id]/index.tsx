import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { useEffect, useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import { MenuCategory } from '@/types/type';
import { createMenuCategory, getStoreInfo } from '@/apis/store/store';
import { useMutation, useQuery } from 'react-query';

export default function CMSStore() {
  const router = useRouter();
  const { id: storeId } = router.query;
  const [menuCategory, setMenuCategory] = useState<string>(''); // 새로운
  const [menuCategoryList, setMenuCategoryList] = useState<MenuCategory[]>([]); // 전체 리스트 관리

  const handleInputChange = (value: string) => {
    setMenuCategory(value);
  };

  const { data: mclist } = useQuery<MenuCategory[]>(
    ['menuCategoryList'],
    async () => {
      const {
        data: {
          storeResponse: { menuCategories },
        },
      } = await getStoreInfo(Number(storeId));
      return menuCategories;
    },
    {
      onSuccess: () => {
        console.log('response1', mclist);
      },
      onError: err => console.log('!!', err),
    },
  );

  useEffect(() => {
    console.log('response2', mclist);
    if (mclist) setMenuCategoryList(mclist);
  }, [mclist]);

  const handleSubmit = () => {
    const addMenuCategory = async () => {
      try {
        const { data } = await createMenuCategory(Number(storeId), {
          name: menuCategory,
        });
        console.log('createMenuCategory', data);
        // 메뉴카테고리 리스트 업뎃
        fetchStoreInfo();
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    addMenuCategory();
  };

  const handleClickStore = (menuCategoryId: number) => {
    router.push({
      pathname: `/cms/${storeId}/${menuCategoryId}`,
    });
  };

  return (
    <Wrapper>
      <Card>
        <StoreContainer>
          {menuCategoryList.map(category => (
            <StyledText
              key={category.menuCategoryId}
              onClick={() => handleClickStore(category.menuCategoryId)}
            >
              {category.name}
            </StyledText>
          ))}
        </StoreContainer>
      </Card>
      <Card>
        <Text h3>메뉴 카테고리 생성</Text>
        <Spacer />
        <Input
          label="메뉴 카테고리"
          name="메뉴 카테고리"
          width="95%"
          crossOrigin={undefined}
          onChange={e => handleInputChange(e.target.value)}
        />
        <Spacer />
        <Button type="secondary" onClick={handleSubmit}>
          제출
        </Button>
        <Spacer style={{ marginTop: '3rem' }} />
      </Card>
      <BottomTab />
    </Wrapper>
  );
}
