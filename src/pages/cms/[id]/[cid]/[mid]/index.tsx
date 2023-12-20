import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { createMenu, createOption } from '@/apis/store/store';
import { useEffect, useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import AddFile from '@/components/add-file';
import { Menu } from '@/types/type';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { menuState } from '@/states/menu';

export default function CMSMenu() {
  const router = useRouter();
  const { cid: menuCategoryId, mid: menuId } = router.query;
  const [menuContents, setMenuContents] = useRecoilState<Menu[]>(menuState);
  const [inputData, setInputData] = useState({
    name: '',
    isEssentialOption: false,
    isMultipleOption: true,
    optionSpec: [{ name: '', price: 0 }],
  });

  useEffect(() => {
    console.log('params', menuCategoryId);
    console.log('menus', menuContents);
  }, []);

  const inputFields = [
    ['옵션 이름', 'name'],
    ['필수 여부', 'isEssentialOption'],
    ['중복 가능', 'isMultipleOption'],
  ];

  const handleInputChange = (fieldName: string, value: string) => {
    setInputData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const mutateMenu = useMutation(createOption, {
    onSuccess: response => {
      console.log('createmenu', response);
      // setMenuContents(inputData); // response 물어보자
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
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
          {menuContents?.map((menu: Menu) => (
            <StyledText
              key={menu.menuId}
              // onClick={() => handleClickStore(menu.menuCategoryId)}
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
        <Button type="secondary" onClick={handleSubmit}>
          제출
        </Button>
        <Spacer style={{ marginTop: '3rem' }} />
      </Card>
      <BottomTab />
    </Wrapper>
  );
}
