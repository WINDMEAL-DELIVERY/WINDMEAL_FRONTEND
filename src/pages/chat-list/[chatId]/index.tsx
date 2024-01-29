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
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ChattingProps } from '@type/chattingType';
import { getChatting } from '@apis/chatting/chatting';
import { useEffect, useState } from 'react';

function ChatRoom() {
  const router = useRouter();
  const { chatroomId, opponentNickname, orderId } = router.query as {
    chatroomId: string;
    opponentNickname: string;
    orderId: string;
  };
  const [chatMessages, setChatMessages] = useState<ChattingProps[]>();

  useQuery<ChattingProps[]>(
    ['chatting'],
    () => {
      return getChatting(chatroomId);
    },
    {
      onSuccess: chatMessage => {
        setChatMessages(chatMessage);
      },
      onError: err => console.log('chatMessage Error', err),
    },
  );

  return (
    <Wrapper>
      <Header>
        <GoBack onClick={router.back}>
          <LeftOutlined />
        </GoBack>
        <OppositeNickName>{opponentNickname}</OppositeNickName>
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
        {chatroomId}
        {orderId}
        <TimeStamp>2024. 01. 07 일요일</TimeStamp>
      </ChattingHistory>
    </Wrapper>
  );
}

export default ChatRoom;
