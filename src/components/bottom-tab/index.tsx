import { NavItem, Wrapper } from '@components/bottom-tab/styles';

export default function BottomTab() {
  return (
    <Wrapper>
      <NavItem href="/bulletin-board">게시글</NavItem>
      <NavItem href="/">홈</NavItem>
      <NavItem href="/chat-list">채팅</NavItem>
      <NavItem href="/my-page">마이페이지</NavItem>
    </Wrapper>
  );
}
