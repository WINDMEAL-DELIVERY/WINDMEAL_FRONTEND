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
} from '@pages/chat-list/styles';
import { LeftOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { getChattingList } from '@apis/chatting/chatting';
import { useState } from 'react';
import { ChattingListProps } from '@type/chattingType';

export default function ChatList() {
  const [chattingRooms, setChattingRooms] = useState<ChattingListProps[]>([]);

  // useQuery<ChattingListProps[]>(
  //   ['chattingList'],
  //   async () => {
  //     const { data } = await getChattingList();
  //     return data.content;
  //   },
  //   {
  //     onSuccess: chattingList => {
  //       console.log(chattingList);
  //       setChattingRooms(chattingList);
  //     },
  //     onError: err => console.log('!!', err),
  //   },
  // );

  return (
    <Wrapper>
      <Header>
        <GoBack>
          <LeftOutlined />
        </GoBack>
        <Title>채팅</Title>
      </Header>
      <ChattingList>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>신의한컵, AI공학관</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임1</NickName>
              <Time>2분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <LastMessage>채팅 내용</LastMessage>
              <Update number={2}>
                <UpdateNums>2</UpdateNums>
              </Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>신의한컵, AI공학관</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임1</NickName>
              <Time>2분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <LastMessage>채팅 내용</LastMessage>
              <Update number={20}>
                <UpdateNums>20</UpdateNums>
              </Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>신의한컵, AI공학관</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임1</NickName>
              <Time>2분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <LastMessage>채팅 내용</LastMessage>
              <Update number={100}>
                <UpdateNums>100</UpdateNums>
              </Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
      </ChattingList>
      <BottomTab />
    </Wrapper>
  );
}
