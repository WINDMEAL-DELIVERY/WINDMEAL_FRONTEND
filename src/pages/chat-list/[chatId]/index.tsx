import {
  ChatWrapper,
  Header,
  GoBack,
  OppositeNickName,
  Icons,
  ChattingHistory,
  OpponentMessage,
  MyMessage,
  OpponentProfileImage,
  OpponentTimeStamp,
  OpponentNickName,
  OpponentNicknameNMessageInfo,
  MyMessageDiv,
  OpponentMessageDiv,
  MyTimeStamp,
  ChatBottomDiv,
  ChatInputDiv,
} from '@styles/chatIdStyles';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ChattingProps } from '@type/chattingType';
import { getChatting } from '@apis/chatting/chatting';
import { useEffect, useRef, useState } from 'react';
import {
  IconAlarm,
  IconDots,
  IconImage,
  IconLt,
  IconSend,
} from '../../../../public/svgs';

function ChatRoom() {
  const router = useRouter();
  const { chatroomId, opponentNickname, orderId } = router.query as {
    chatroomId: string;
    opponentNickname: string;
    orderId: string;
  };
  const [chatMessages, setChatMessages] = useState<ChattingProps[]>();
  const [flag, setFlag] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && flag) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [flag]);

  useQuery<ChattingProps[]>(
    ['chatting'],
    () => {
      return getChatting(chatroomId);
    },
    {
      onSuccess: chatMessage => {
        if (!chatMessages) setFlag(true);
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
    <ChatWrapper>
      <Header>
        <GoBack onClick={router.back}>
          <IconLt />
        </GoBack>
        <OppositeNickName>{opponentNickname}</OppositeNickName>
        <Icons>
          <IconAlarm />
          <IconDots />
        </Icons>
      </Header>
      <ChattingHistory ref={scrollRef}>
        {chatMessages ? (
          chatMessages.reverse().map(message => {
            if (message.fromMe) {
              return (
                <MyMessageDiv key={message.messageId}>
                  <div>
                    <MyMessage>{message.message}</MyMessage>
                    <MyTimeStamp>
                      {formatDateTime(message.sendTime)}
                    </MyTimeStamp>
                  </div>
                </MyMessageDiv>
              );
            }
            return (
              <OpponentMessageDiv key={message.messageId}>
                <OpponentProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                <OpponentNicknameNMessageInfo>
                  <OpponentNickName>{opponentNickname}</OpponentNickName>
                  <OpponentMessage>{message.message}</OpponentMessage>
                  <OpponentTimeStamp>
                    {formatDateTime(message.sendTime)}
                  </OpponentTimeStamp>
                </OpponentNicknameNMessageInfo>
              </OpponentMessageDiv>
            );
          })
        ) : (
          <div />
        )}
      </ChattingHistory>
      <ChatBottomDiv>
        <IconImage />
        <ChatInputDiv placeholder="메시지 보내기" />
        <IconSend />
      </ChatBottomDiv>
    </ChatWrapper>
  );
}

export default ChatRoom;
