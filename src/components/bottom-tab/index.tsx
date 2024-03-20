import { NavItem, Wrapper } from '@components/bottom-tab/styles';
import { useRouter } from 'next/router';

export default function BottomTab() {
  const router = useRouter();
  return (
    <Wrapper>
      <NavItem
        href="/bulletin-board"
        prefetch
        $isActive={router.pathname === '/bulletin-board'}
      >
        게시글
      </NavItem>
      <NavItem href="/main" prefetch $isActive={router.pathname === '/main'}>
        홈
      </NavItem>
      <NavItem
        href="/chat-list"
        prefetch
        $isActive={router.pathname === '/chat-list'}
      >
        채팅
      </NavItem>
      <NavItem
        href="/my-page"
        prefetch
        $isActive={router.pathname === '/my-page'}
      >
        마이페이지
      </NavItem>
    </Wrapper>
  );
}
