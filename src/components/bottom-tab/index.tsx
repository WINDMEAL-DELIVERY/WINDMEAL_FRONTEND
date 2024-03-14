import { NavItem, Wrapper } from '@components/bottom-tab/styles';
import { useRouter } from 'next/router';

export default function BottomTab() {
  const router = useRouter();
  return (
    <Wrapper>
      <NavItem href="/order-list" $isActive={router.pathname === '/order-list'}>
        주문목록
      </NavItem>
      <NavItem href="/main" $isActive={router.pathname === '/main'}>
        홈
      </NavItem>
      <NavItem href="/chat-list" $isActive={router.pathname === '/chat-list'}>
        채팅
      </NavItem>
      <NavItem href="/my-page" $isActive={router.pathname === '/my-page'}>
        마이페이지
      </NavItem>
    </Wrapper>
  );
}
