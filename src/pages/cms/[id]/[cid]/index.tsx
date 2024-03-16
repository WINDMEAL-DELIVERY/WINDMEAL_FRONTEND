import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { createMenu } from '@/apis/cms-store/store';
import { useEffect, useState } from 'react';
import { CMSWrapper, StoreContainer, StyledText } from '@/styles/cmsStyles';
import AddFile from '@/components/add-file';
import { Menu, MenuInput } from '@/types/type';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { menuState } from '@/states/menu';
import FloatingHomeButton from '@/components/floating-home-button';

export default function CMSMenuCategory() {
  const router = useRouter();
  const { id: storeId, cid: menuCategoryId } = router.query;
  const [menuImg, setMenuImg] = useState<string | null>(null);
  const [menuContents, setMenuContents] = useRecoilState<Menu[]>(menuState);
  const initialInput = {
    menuCategoryId: menuCategoryId as string,
    name: '',
    description: '',
    price: 0,
  };
  const [inputData, setInputData] = useState<MenuInput>(initialInput);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const inputFields = [
    ['메뉴 이름', 'name'],
    ['메뉴 설명', 'description'],
    ['가격', 'price'],
  ];

  const renderInputs = () => {
    return inputFields.map(input => (
      <Input
        key={input[0]}
        label={input[0]}
        name={input[1]}
        width="95%"
        crossOrigin={undefined}
        value={inputData[input[1]]}
        onChange={e => handleInputChange(input[1], e.target.value)}
      />
    ));
  };

  useEffect(() => {
    console.log('params', menuCategoryId);
    console.log('menus', menuContents);
  }, []);

  const handleAddFile = (img: string) => {
    setMenuImg(img);
  };

  const mutateMenu = useMutation(createMenu, {
    onSuccess: response => {
      console.log('createmenu', response.data);
      setMenuContents(prev => [...prev, response.data]);
      setInputData(initialInput);
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
    setIsSubmit(true);
  };

  const handleClickStore = (menuID: number) => {
    router.push({
      pathname: `/cms/${storeId}/${menuCategoryId}/${menuID}`,
    });
  };

  return (
    <CMSWrapper>
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
        <AddFile onImageUpload={handleAddFile} onSubmit={isSubmit} />
        <Spacer />
        <Button type="secondary" onClick={handleSubmit}>
          제출
        </Button>
        <Spacer style={{ marginTop: '3rem' }} />
      </Card>
      <FloatingHomeButton />
    </CMSWrapper>
  );
}
