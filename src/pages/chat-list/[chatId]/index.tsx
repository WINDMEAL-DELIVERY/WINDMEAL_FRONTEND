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
import { getCookie } from 'cookies-next';
import { useLocation } from 'react-use';
import * as StompJs from '@stomp/stompjs';
import {
  IconAlarm,
  IconDots,
  IconImage,
  IconLt,
  IconSend,
} from '../../../../public/svgs';

interface ChatClient {
  activate: () => void;
  connected: boolean;
  publish: (params: StompJs.IPublishParams) => void;
  subscribe: (
    destination: string,
    callback: (message: StompJs.Message) => void,
    headers?: Record<string, never>,
  ) => void;
}

function ChatRoom() {
  const router = useRouter();
  const client = useRef<ChatClient>({
    activate: () => {
      client.current.connected = true;
    },
    connected: false,
    publish: () => {},
    subscribe: () => {},
  });
  const { pathname } = useLocation();
  const {
    chatroomId,
    opponentNickname,
    opponentProfileImage,
    opponentAlarmToken,
    orderId,
  } = router.query as {
    chatroomId: string;
    opponentNickname: string;
    opponentProfileImage: string;
    opponentAlarmToken: string;
    orderId: string;
  };
  const [chatMessages, setChatMessages] = useState<ChattingProps[]>();
  const [flag, setFlag] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');

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

  const connect = async () => {
    const token: string = (await getCookie('token')) || '';
    if (token) {
      const queryParams = token;
      const uri = encodeURIComponent(queryParams);
      const alarmUri = encodeURIComponent(opponentAlarmToken);
      const stompUrl = `${
        process.env.NEXT_PUBLIC_STOMP_URL + uri
      }&code_a=${alarmUri}`;
      client.current = new StompJs.Client({
        brokerURL: stompUrl,
        connectHeaders: {
          Authorization: token,
        },
        onConnect: () => {
          console.log('success');
        },
        onStompError: frame => {
          // ex : 커넥션을 맺은 후 채팅을 보내다 토큰이 만료 됐을때
          console.error('STOMP 에러 발생');
          console.error('STOMP Error:', frame.headers.message);
        },
        onDisconnect: () => {
          console.error('연결끊김');
        },
        onWebSocketError: event => {
          // ex : 애초에 토큰이 만료된 상태로 커넥션을 시도할때
          console.error('웹소켓 에러발생', event);
        },
      });
    }
    client.current.activate();
  };

  useEffect(() => {
    if (client.current.connected) return;
    console.log('호출됨');
    connect();
  }, [pathname]);

  const onClickMessageHandler = async () => {
    const token: string = (await getCookie('token')) || '';
    if (token && text) {
      client.current.publish({
        destination: `/pub/chat.message.${chatroomId}`,
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          chatRoomId: chatroomId,
          type: 'TEXT',
          message: text,
        }),
      });
      setText('');
    }
  };

  const saveUserText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

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
          chatMessages.map(message => {
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
                <OpponentProfileImage src={opponentProfileImage} />
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
        <ChatInputDiv
          placeholder="메시지 보내기"
          value={text}
          onChange={saveUserText}
        />
        <IconSend onClick={onClickMessageHandler} />
      </ChatBottomDiv>
    </ChatWrapper>
  );
}

export default ChatRoom;
