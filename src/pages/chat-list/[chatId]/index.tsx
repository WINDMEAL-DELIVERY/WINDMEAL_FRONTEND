import {
  Header,
  GoBack,
  OppositeNickName,
  Alarm,
  Plus,
  Icons,
  TimeStamp,
  ChattingHistory,
} from '@styles/chatIdStyles';
import { BellOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { Wrapper } from '@styles/styles';
import { useRecoilValue } from 'recoil';
import { chatRoomInfoState } from '@/states/chatting';

function ChatRoom() {
  const chatRoomInfo = useRecoilValue(chatRoomInfoState);

  return (
    <Wrapper>
      <Header>
        <GoBack>
          <LeftOutlined />
        </GoBack>
        <OppositeNickName>{chatRoomInfo.opponentNickname}</OppositeNickName>
        <Icons>
          <Alarm>
            <BellOutlined />{' '}
          </Alarm>
          <Plus>
            <MoreOutlined />
          </Plus>
        </Icons>
      </Header>
      <ChattingHistory>
        {chatRoomInfo.chatroomId}
        <TimeStamp>2024. 01. 07 일요일</TimeStamp>
      </ChattingHistory>
    </Wrapper>
  );
}

export default ChatRoom;
