import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { createMenu } from '@/apis/store/store';
import { useEffect, useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import AddFile from '@/components/add-file';
import { Menu } from '@/types/type';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { menuState } from '@/states/menu';

export default function CMSMenuCategory() {
  const router = useRouter();
  const { id: storeId, cid: menuCategoryId } = router.query;
  const [menuImg, setMenuImg] = useState<string | null>(null);
  const [menuContents, setMenuContents] = useRecoilState<Menu[]>(menuState);
  const [inputData, setInputData] = useState({
    menuCategoryId,
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    console.log('params', menuCategoryId);
    console.log('menus', menuContents);
  }, []);

  const inputFields = [
    ['메뉴 이름', 'name'],
    ['메뉴 설명', 'description'],
    ['가격', 'price'],
  ];

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleAddFile = (img: string) => {
    setMenuImg(img);
  };

  const mutateMenu = useMutation(createMenu, {
    onSuccess: response => {
      console.log('createmenu', response.data);
      setMenuContents(prev => [...prev, response.data]);
      console.log('!!', menuContents);
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData();
    const menuImgOptional = menuImg === null ? 'defaultImgUrl' : menuImg;
    formData.append(
      'request',
      new Blob([JSON.stringify(inputData)], { type: 'application/json' }),
    );
    formData.append('file', menuImgOptional);
    mutateMenu.mutate(formData);
  };

  const renderInputs = () => {
    return inputFields.map(label => (
      <Input
        key={label[0]}
        label={label[0]}
        name={label[1]}
        width="95%"
        crossOrigin={undefined}
        onChange={e => handleInputChange(label[1], e.target.value)}
      />
    ));
  };

  const handleClickStore = (menuID: number) => {
    router.push({
      pathname: `/cms/${storeId}/${menuCategoryId}/${menuID}`,
    });
  };

  return (
    <Wrapper>
      <Card>
        <StoreContainer>
          {menuContents?.map((menu: Menu) => (
            <StyledText
              key={menu.menuId}
              onClick={() => handleClickStore(menu.menuId)}
            >
              {menu.name}
            </StyledText>
          ))}
        </StoreContainer>
      </Card>
      <Card>
        <Text h3>메뉴 생성</Text>
        <Spacer />
        {renderInputs()}
        <Spacer />
        <AddFile onImageUpload={handleAddFile} />
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
