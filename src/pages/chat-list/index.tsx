import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import {
  Chat,
  ChattingList,
  GoBack,
  Title,
  ProfileImage,
  ProfileImageFrame,
  ShopNDest,
  NickNameNTime,
  NickName,
  Time,
  ChattingNUpdate,
  Update,
  ChattingInfoFrame,
  Header,
  UpdateNums,
  LastMessage,
} from '@styles/chat-listStyle';
import { useQuery } from 'react-query';
import { getChattingList } from '@apis/chatting/chatting';
import { useState } from 'react';
import { ChattingListProps } from '@type/chattingType';
import { useRouter } from 'next/router';
import { IconLt } from '../../../public/svgs';

export default function ChatList() {
  const [chattingRooms, setChattingRooms] = useState<ChattingListProps[]>([]);
  const router = useRouter();

  useQuery<ChattingListProps[]>(
    ['chattingList'],
    () => {
      return getChattingList();
    },
    {
      onSuccess: chattingList => {
        setChattingRooms(chattingList);
      },
      onError: err => console.log('chattingList Error', err),
    },
  );

  function formatDateTime(dateTimeString: string) {
    const inputDate = new Date(dateTimeString);
    const currentDate = new Date();

    const inputDateWithTimeZone = new Date(
      inputDate.getTime() + 9 * 60 * 60 * 1000,
    );

    if (
      inputDateWithTimeZone.getDate() === currentDate.getDate() &&
      inputDateWithTimeZone.getMonth() === currentDate.getMonth() &&
      inputDateWithTimeZone.getFullYear() === currentDate.getFullYear()
    ) {
      const hours = inputDateWithTimeZone.getHours() % 12 || 12;
      const minutes = inputDateWithTimeZone.getMinutes();
      const ampm = inputDateWithTimeZone.getHours() >= 12 ? '오후' : '오전';
      return `${ampm} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    if (
      inputDateWithTimeZone.getDate() === yesterday.getDate() &&
      inputDateWithTimeZone.getMonth() === yesterday.getMonth() &&
      inputDateWithTimeZone.getFullYear() === yesterday.getFullYear()
    ) {
      return '어제';
    }

    const year =
      inputDateWithTimeZone.getFullYear() !== currentDate.getFullYear()
        ? `${inputDateWithTimeZone.getFullYear()}.`
        : '';
    const month = inputDateWithTimeZone.getMonth() + 1;
    const day = inputDateWithTimeZone.getDate();
    return `${year}${month < 10 ? '0' : ''}${month}.${
      day < 10 ? '0' : ''
    }${day}`;
  }

  const handleChatClick = (chatRoom: ChattingListProps) => {
    router.push(
      {
        pathname: `/chat-list/${chatRoom.chatroomId}`,
        query: {
          chatroomId: chatRoom.chatroomId,
          opponentNickname: chatRoom.opponentNickname,
          orderId: chatRoom.orderId,
        },
      },
      `/chat-list/${chatRoom.chatroomId}`,
    );
  };

  return (
    <Wrapper>
      <Header>
        <GoBack onClick={router.back}>
          <IconLt />
        </GoBack>
        <Title>채팅</Title>
      </Header>
      <ChattingList>
        {!chattingRooms ? (
          <div>채팅방이 없습니다.</div>
        ) : (
          <>
            {chattingRooms.map(chatRoom => (
              <Chat
                key={chatRoom.chatroomId}
                onClick={() => handleChatClick(chatRoom)}
              >
                <ProfileImageFrame>
                  <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                </ProfileImageFrame>
                <ChattingInfoFrame>
                  <ShopNDest>{`${chatRoom.orderInfo?.storeName}/${chatRoom.orderInfo?.placeName}`}</ShopNDest>
                  <NickNameNTime>
                    <NickName>{chatRoom.opponentNickname}</NickName>
                    <Time>{formatDateTime(chatRoom.lastMessageTime)}</Time>
                  </NickNameNTime>
                  <ChattingNUpdate>
                    <LastMessage>
                      {chatRoom.messageType === 'TEXT' && chatRoom.lastMessage
                        ? chatRoom.lastMessage.length >= 20
                          ? `${chatRoom.lastMessage.substring(0, 20)}...`
                          : chatRoom.lastMessage
                        : '사진'}
                    </LastMessage>
                    <Update number={chatRoom.uncheckedMessageCount}>
                      {chatRoom.uncheckedMessageCount !== 0 ? (
                        <UpdateNums>
                          {chatRoom.uncheckedMessageCount}
                        </UpdateNums>
                      ) : (
                        <div />
                      )}
                    </Update>
                  </ChattingNUpdate>
                </ChattingInfoFrame>
              </Chat>
            ))}
          </>
        )}
      </ChattingList>
      <BottomTab />
    </Wrapper>
  );
}
