import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button } from '@geist-ui/react';
import { createMenuCategory, getStoreInfo } from '@/api/cms';
import { useEffect, useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';

export default function CMSMenuCategory() {
  const router = useRouter();
  const { sid: menuCategoryId } = router.query;

  return (
    <Wrapper>
      
      <BottomTab />
    </Wrapper>
  );
}
