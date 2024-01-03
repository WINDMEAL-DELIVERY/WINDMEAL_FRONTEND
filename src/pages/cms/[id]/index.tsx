import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import { Menu, MenuCategory } from '@/types/type';
import { createMenuCategory, getStoreInfo } from '@/apis/store/store';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { menuState } from '@/states/menu';
import HashTag from '@/components/hash-tag';

export default function CMSStore() {
  const router = useRouter();
  const { id: storeIdString } = router.query;
  const storeId = storeIdString ? Number(storeIdString) : undefined;
  const [menuCategory, setMenuCategory] = useState<string>(''); // 새로운
  const [menuCategoryList, setMenuCategoryList] = useState<MenuCategory[]>([]); // 전체 리스트 관리
  const [, setMenuContents] = useRecoilState<Menu[]>(menuState);

  const queryClient = useQueryClient();

  const handleInputChange = (value: string) => {
    setMenuCategory(value);
  };

  useQuery<MenuCategory[]>(
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
      onSuccess: mclist => {
        console.log('response1', mclist);
        setMenuCategoryList(mclist);
      },
      onError: err => console.log('!!', err),
    },
  );

  const mutateMenuCategory = useMutation(createMenuCategory, {
    onSuccess: response => {
      console.log('createMenuCategory', response);
      queryClient.invalidateQueries('menuCategoryList');
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const handleSubmit = () => {
    mutateMenuCategory.mutate({
      storeId: Number(storeId),
      category: { name: menuCategory },
    });
  };

  const handleClickStore = (
    menuCategoryId: number,
    menu: Menu[] | undefined,
  ) => {
    router.push({
      pathname: `/cms/${storeId}/${menuCategoryId}`,
    });
    if (menu) setMenuContents(menu);
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
        <Spacer />
      </Card>
      <HashTag storeId={storeId} />
      <BottomTab />
    </Wrapper>
  );
}
