import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { createMenuCategory } from '@/api/cms';
import { useState } from 'react';

export default function CMSStore() {
  const router = useRouter();
  const { id: storeId } = router.query;
  const [menuCategory, setMenuCategory] = useState<string>('');

  const handleInputChange = (value: string) => {
    setMenuCategory(value);
  };

  const handleSubmit = () => {
    const addMenuCategory = async () => {
      try {
        const response = await createMenuCategory(Number(storeId), {
          name: menuCategory,
        });
        console.log('response', response);
        // 메뉴카테고리 업뎃 추가
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    addMenuCategory();
  };

  return (
    <Wrapper>
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
