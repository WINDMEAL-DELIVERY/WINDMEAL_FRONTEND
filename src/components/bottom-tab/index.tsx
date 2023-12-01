import { NavItem, Wrapper } from '@components/bottom-tab/styles';
import { useRouter } from 'next/router';

export default function BottomTab() {
  const router = useRouter();
  return (
    <Wrapper>
      <NavItem
        href="/bulletin-board"
        active={router.pathname === '/bulletin-board' ? 'true' : 'false'}
      >
        게시글
      </NavItem>
      <NavItem
        href="/main"
        active={router.pathname === '/main' ? 'true' : 'false'}
      >
        홈
      </NavItem>
      <NavItem
        href="/chat-list"
        active={router.pathname === '/chat-list' ? 'true' : 'false'}
      >
        채팅
      </NavItem>
      <NavItem
        href="/my-page"
        active={router.pathname === '/my-page' ? 'true' : 'false'}
      >
        마이페이지
      </NavItem>
    </Wrapper>
  );
}
