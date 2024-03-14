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
  OpenModalStyle,
  IconNMessage,
} from '@styles/chatIdStyles';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { getChattingMessage, getImageUrl } from '@apis/chatting/chatting';
import { getCookie } from 'cookies-next';
import { useLocation } from 'react-use';
import * as StompJs from '@stomp/stompjs';
import {
  ErrorIcon,
  IconAlarm,
  IconDots,
  IconImage,
  IconLt,
  IconSend,
} from 'public/svgs';
import { useRecoilState } from 'recoil';
import { ErrorModalState } from '@/states/chat';
import ReactHtmlParser from 'react-html-parser';
import Modal from 'react-modal';
import { useInView } from 'react-intersection-observer';

interface ChatClient {
  activate: () => void;
  deactivate: () => void;
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
    deactivate: () => {
      client.current.connected = false;
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
  const [flag, setFlag] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [ErrorModalOpen, setErrorModalOpen] = useRecoilState(ErrorModalState);

  useEffect(() => {
    if (scrollRef.current && flag) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [flag]);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['chatting', chatroomId],
    ({ pageParam = 0 }) => {
      return getChattingMessage(chatroomId, pageParam);
    },
    {
      enabled: !!chatroomId,
      onSuccess: fetchedData => {
        const ChatMessages = fetchedData.pages[0].messages.flat();
        if (!ChatMessages) setFlag(true);
      },
      getNextPageParam: currentData => {
        if (currentData.isLastPage) {
          return undefined;
        }
        return currentData.pageNumber + 1;
      },
      onError: err => console.log('chatMessage Error', err),
    },
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage().catch(error => {
        console.error(error);
      });
    }
  }, [inView, hasNextPage, isLoading, fetchNextPage]);

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
          setErrorModalOpen(true);
        },
        onDisconnect: () => {
          console.error('연결끊김');
          client.current.deactivate();
          router.back();
        },
        onWebSocketError: event => {
          // ex : 애초에 토큰이 만료된 상태로 커넥션을 시도할때
          console.error('웹소켓 에러발생', event);
          setErrorModalOpen(true);
        },
      });
    }
    client.current.activate();
  };

  const goBack = () => {
    client.current.deactivate();
    router.back();
  };

  useEffect(() => {
    if (client.current.connected) return;
    console.log('호출됨');
    connect();
  }, [pathname]);

  const onClickMessageHandler = async () => {
    const token: string = (await getCookie('token')) || '';
    const sendText = text.endsWith('\n') ? text.slice(0, -1) : text;
    if (token && sendText) {
      client.current.publish({
        destination: `/pub/chat.message.${chatroomId}`,
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          chatRoomId: chatroomId,
          type: 'TEXT',
          message: sendText,
        }),
      });
    }
    await queryClient.invalidateQueries('chatting');
    setText('');
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (text.trim() !== '') {
        onClickMessageHandler();
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      await queryClient.invalidateQueries('chatting');
    }
  }

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const DirectToChatListPage = () => {
    setErrorModalOpen(false);
    router.replace('/chat-list');
  };

  useEffect(() => {
    if (ErrorModalOpen) {
      setTimeout(() => {
        DirectToChatListPage();
      }, 3000);
    }
  }, [ErrorModalOpen]);

  return (
    <ChatWrapper>
      <Modal isOpen={ErrorModalOpen} style={OpenModalStyle}>
        <IconNMessage>
          <ErrorIcon />
          채팅 오류
        </IconNMessage>
        <div>채팅방 리스트 페이지로 넘어갑니다..</div>
      </Modal>
      <Header>
        <GoBack onClick={goBack}>
          <IconLt />
        </GoBack>
        <OppositeNickName>{opponentNickname}</OppositeNickName>
        <Icons>
          <IconAlarm />
          <IconDots />
        </Icons>
      </Header>
      <ChattingHistory ref={scrollRef}>
        {data?.pages ? (
          data?.pages
            .flatMap(page => page.messages)
            .map((message, index, messages) => {
              const nextMessage = messages[index - 1];
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
                        <MyMessage>
                          {ReactHtmlParser(
                            message.message.replace(/\n/g, '<br/>'),
                          )}
                        </MyMessage>
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
                        <OpponentMessage>
                          {ReactHtmlParser(
                            message.message.replace(/\n/g, '<br/>'),
                          )}
                        </OpponentMessage>
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
        {hasNextPage && <div ref={ref} />}
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
          onChange={handleChange}
          onKeyUp={onKeyUp}
        />
        <IconSend onClick={onClickMessageHandler} />
      </ChatBottomDiv>
    </ChatWrapper>
  );
}

export default ChatRoom;
