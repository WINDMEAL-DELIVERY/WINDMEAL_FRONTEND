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
import { useInfiniteQuery, useQuery } from 'react-query';
import { getChattingList, getChattingMessage } from '@apis/chatting/chatting';
import { useEffect, useState } from 'react';
import { ChattingListProps } from '@type/chattingType';
import { useRouter } from 'next/router';
import { IconLt } from 'public/svgs';
import { useInView } from 'react-intersection-observer';

export default function ChatList() {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['chattingList'],
    ({ pageParam = 1 }) => {
      return getChattingList(pageParam);
    },
    {
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
    const currentDate = new Date();

    if (
      inputDate.getDate() === currentDate.getDate() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    ) {
      const hours = inputDate.getHours() % 12 || 12;
      const minutes = inputDate.getMinutes();
      const ampm = inputDate.getHours() >= 12 ? '오후' : '오전';
      return `${ampm} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    if (
      inputDate.getDate() === yesterday.getDate() &&
      inputDate.getMonth() === yesterday.getMonth() &&
      inputDate.getFullYear() === yesterday.getFullYear()
    ) {
      return '어제';
    }

    const year =
      inputDate.getFullYear() !== currentDate.getFullYear()
        ? `${inputDate.getFullYear()}.`
        : '';
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();
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
          opponentProfileImage: chatRoom.opponentProfileImage,
          opponentAlarmToken: chatRoom.opponentAlarmToken,
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
        {!data?.pages ? (
          <div>채팅방이 없습니다.</div>
        ) : (
          data?.pages
            .flatMap(page => page.chatList)
            .map(chatRoom => (
              <Chat
                key={chatRoom.chatroomId}
                onClick={() => handleChatClick(chatRoom)}
              >
                <ProfileImageFrame>
                  <ProfileImage src={chatRoom.opponentProfileImage} />
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
                      ) : null}
                    </Update>
                  </ChattingNUpdate>
                </ChattingInfoFrame>
              </Chat>
            ))
        )}
        {hasNextPage && <div ref={ref} />}
      </ChattingList>
      <BottomTab />
    </Wrapper>
  );
}
