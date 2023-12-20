import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { createMenu } from '@/apis/store/store';
import { useEffect, useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import AddFile from '@/components/add-file';
import { Menu, MenuCategory } from '@/types/type';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { menuState } from '@/states/menu';

export default function CMSMenuCategory() {
  const router = useRouter();
  const { cid: menuCategoryId } = router.query;
  const [menuImg, setMenuImg] = useState<string | null>(null);
  const menuContents = useRecoilValue(menuState);
  const [menus, setMenus] = useState(menuContents);
  const [inputData, setInputData] = useState({
    menuCategoryId,
    name: '',
    description: '',
    price: { price: 0 },
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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData();
    const menuImgOptional = menuImg === null ? 'defaultImgUrl' : menuImg;
    formData.append('request', JSON.stringify(inputData));
    formData.append('file', menuImgOptional);
    for (const pair of formData.entries()) {
      console.log(pair);
    }
    const addMenu = async () => {
      try {
        const response = await createMenu(formData);
        console.log('response', response);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    addMenu();
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

  return (
    <Wrapper>
      <Card>
        <StoreContainer>
          {menus?.map((menu: Menu) => (
            <StyledText
              key={menu.menuId}
              onClick={() => handleClickStore(category.menuCategoryId)}
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
