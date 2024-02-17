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
  TimeStamp,
  MyImage,
  OpponentImage,
} from '@styles/chatIdStyles';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { ChattingMessageProps } from '@type/chattingType';
import { getChattingMessage, getImageUrl } from '@apis/chatting/chatting';
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
  publish: (params: {
    headers: { Authorization: string };
    destination: `/pub/chat.message.${string}`;
    body: string;
  }) => void;
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
  const [chatMessages, setChatMessages] = useState<ChattingMessageProps[]>();
  const [flag, setFlag] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (scrollRef.current && flag) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [flag]);

  useQuery<ChattingMessageProps[]>(
    ['chatting'],
    () => {
      return getChattingMessage(chatroomId);
    },
    {
      onSuccess: chatMessage => {
        console.log(chatMessage);
        if (!chatMessages) setFlag(true);
        setChatMessages(chatMessage);
      },
      onError: err => console.log('chatMessage Error', err),
    },
  );

  function formatDateTime(dateTimeString: string) {
    const inputDate = new Date(dateTimeString);
    const hours = inputDate.getHours() % 12 || 12;
    const minutes = inputDate.getMinutes();
    const ampm = inputDate.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  }

  function formatTimeStamp(inputDate: Date) {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[inputDate.getDay()];

    return `${year}. ${month}. ${day}. ${dayOfWeek}요일`;
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
    console.log(text);
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
    }
    setText('');
    queryClient.invalidateQueries('chatting');
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('enter');
      onClickMessageHandler();
    }
  };

  const saveUserText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const isSameDay = (toDay: Date, compareDay?: Date | null) => {
    return (
      toDay.getFullYear() === compareDay?.getFullYear() &&
      toDay.getMonth() === compareDay?.getMonth() &&
      toDay.getDate() === compareDay?.getDate()
    );
  };

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      const imageUrl = await getImageUrl(formData);

      const token: string = (await getCookie('token')) || '';
      if (token && imageUrl) {
        client.current.publish({
          destination: `/pub/chat.message.${chatroomId}`,
          headers: {
            Authorization: token,
          },
          body: JSON.stringify({
            chatRoomId: chatroomId,
            type: 'IMAGE',
            message: imageUrl,
          }),
        });
      }
      queryClient.invalidateQueries('chatting');
    }
  }

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
      <ChattingHistory ref={scrollRef} key={chatroomId}>
        {chatMessages ? (
          chatMessages.map((message, index) => {
            const nextMessage = chatMessages[index - 1];
            const nextMessageDate =
              index !== 0 ? new Date(nextMessage.sendTime) : new Date();

            const isNewDate =
              index === 0
                ? false
                : !isSameDay(
                    new Date(message.sendTime),
                    new Date(nextMessage.sendTime),
                  );

            const isImage = message.messageType === 'IMAGE';

            if (message.fromMe) {
              return (
                <>
                  {isNewDate && (
                    <TimeStamp>{formatTimeStamp(nextMessageDate)}</TimeStamp>
                  )}
                  <MyMessageDiv key={message.messageId}>
                    {isImage ? (
                      <MyImage src={message.message} />
                    ) : (
                      <MyMessage>{message.message}</MyMessage>
                    )}
                    <MyTimeStamp>
                      {formatDateTime(message.sendTime)}
                    </MyTimeStamp>
                  </MyMessageDiv>
                </>
              );
            }
            return (
              <>
                {isNewDate && (
                  <TimeStamp>{formatTimeStamp(nextMessageDate)}</TimeStamp>
                )}
                <OpponentMessageDiv key={message.messageId}>
                  <OpponentProfileImage src={opponentProfileImage} />
                  <OpponentNicknameNMessageInfo>
                    <OpponentNickName>{opponentNickname}</OpponentNickName>
                    {isImage ? (
                      <OpponentImage src={message.message} />
                    ) : (
                      <OpponentMessage>{message.message}</OpponentMessage>
                    )}
                    <OpponentTimeStamp>
                      {formatDateTime(message.sendTime)}
                    </OpponentTimeStamp>
                  </OpponentNicknameNMessageInfo>
                </OpponentMessageDiv>
              </>
            );
          })
        ) : (
          <div />
        )}
      </ChattingHistory>
      <ChatBottomDiv>
        <div>
          <input
            ref={fileInputRef}
            accept="image/*"
            multiple
            type="file"
            onChange={onUpload}
            style={{ display: 'none' }}
          />
          <IconImage onClick={handleIconClick} />
        </div>
        <ChatInputDiv
          placeholder="메시지 보내기"
          value={text}
          onChange={saveUserText}
          onKeyUp={onKeyUp}
        />
        <IconSend onClick={onClickMessageHandler} />
      </ChatBottomDiv>
    </ChatWrapper>
  );
}

export default ChatRoom;
