import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@pages/chat-list/styles';

export default function ChatList() {
  return (
    <Wrapper>
      <div>채팅 목록</div>
      <BottomTab />
    </Wrapper>
  );
}
