import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { createMenuCategory, getStoreInfo } from '@/api/cms';
import { useEffect, useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import { Menu, MenuCategory } from '@/types/type';

export default function CMSStore() {
  const router = useRouter();
  const { id: storeId } = router.query;
  const [menuCategory, setMenuCategory] = useState<string>(''); // 새로운
  const [menuCategoryList, setMenuCategoryList] = useState<MenuCategory[]>([]); // 전체 리스트 관리

  const handleInputChange = (value: string) => {
    setMenuCategory(value);
  };

  const fetchStoreInfo = async () => {
    try {
      const {
        data: {
          storeResponse: { menuCategories },
        },
      } = await getStoreInfo(Number(storeId));
      console.log('menuCategories', menuCategories);
      setMenuCategoryList(menuCategories);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    fetchStoreInfo();
  }, []);

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

  const handleClickStore = (menuCategoryId: number, menus: Menu[]) => {
    console.log("menus", menus)
    router.push({
      pathname: `/cms/${storeId}/${menuCategoryId}`,
      query: { menulist: menus },
    });
  };

  return (
    <Wrapper>
      <Card>
        <StoreContainer>
          {menuCategoryList.map(category => (
            <StyledText
              key={category.menuCategoryId}
              onClick={() =>
                handleClickStore(category.menuCategoryId, category.menus)
              }
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
