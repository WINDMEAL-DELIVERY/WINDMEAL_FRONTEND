import {
  Header,
  GoBack,
  OppositeNickName,
  Alarm,
  Plus,
  Icons,
  ChattingHistory,
  OpponentMessage,
  MyMessage,
  OpponentProfileImage,
  OpponentTimeStamp,
  OpponentNickName,
  Message,
  OpponentNicknameNMessageInfo,
} from '@styles/chatIdStyles';
import { BellOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ChattingProps } from '@type/chattingType';
import { getChatting } from '@apis/chatting/chatting';
import { useState } from 'react';
import { Wrapper } from '@styles/styles';

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

  function formatDateTime(dateTimeString: string) {
    const inputDate = new Date(dateTimeString);
    const inputDateWithTimeZone = new Date(
      inputDate.getTime() + 9 * 60 * 60 * 1000,
    );
    const hours = inputDateWithTimeZone.getHours() % 12 || 12;
    const minutes = inputDateWithTimeZone.getMinutes();
    const ampm = inputDateWithTimeZone.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  }

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
        {chatMessages ? (
          chatMessages.map((message, index) => {
            if (message.fromMe) {
              return (
                <MyMessage key={index}>
                  <div>dd</div>
                  {message.message}
                </MyMessage>
              );
            }
            return (
              <OpponentMessage key={index}>
                <OpponentProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                <OpponentNicknameNMessageInfo>
                  <OpponentNickName>{opponentNickname}</OpponentNickName>
                  <Message>{message.message}</Message>
                  <OpponentTimeStamp>
                    {formatDateTime(message.sendTime)}
                  </OpponentTimeStamp>
                </OpponentNicknameNMessageInfo>
              </OpponentMessage>
            );
          })
        ) : (
          <div />
        )}
      </ChattingHistory>
    </Wrapper>
  );
}

export default ChatRoom;
