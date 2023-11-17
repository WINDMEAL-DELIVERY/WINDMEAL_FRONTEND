import BottomTab from '@components/bottom-tab';
import { HeaderBarWithTwoComponents, Wrapper } from '@styles/styles';
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
} from '@pages/chat-list/styles';

export default function ChatList() {
  return (
    <Wrapper>
      <HeaderBarWithTwoComponents>
        <GoBack type="button">뒤로가기</GoBack>
        <Title>채팅</Title>
      </HeaderBarWithTwoComponents>
      <ChattingList>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>신의한컵, AI공학관</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임1</NickName>
              <Time>몇 분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <span>채팅 내용</span>
              <Update number={2}>2</Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>만두, 3기숙사</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임2</NickName>
              <Time>몇 분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <span>채팅 내용</span>
              <Update number={30}>30</Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>만두, 3기숙사</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임2</NickName>
              <Time>몇 분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <span>채팅 내용</span>
              <Update number={200}>200</Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>만두, 3기숙사</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임2</NickName>
              <Time>몇 분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <span>채팅 내용</span>
              <Update number={200}>200</Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>만두, 3기숙사</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임2</NickName>
              <Time>몇 분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <span>채팅 내용</span>
              <Update number={200}>200</Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>만두, 3기숙사</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임2</NickName>
              <Time>몇 분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <span>채팅 내용</span>
              <Update number={200}>200</Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
        <Chat>
          <ProfileImageFrame>
            <ProfileImage src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
          </ProfileImageFrame>
          <ChattingInfoFrame>
            <ShopNDest>만두, 3기숙사</ShopNDest>
            <NickNameNTime>
              <NickName>닉네임2</NickName>
              <Time>몇 분 전</Time>
            </NickNameNTime>
            <ChattingNUpdate>
              <span>채팅 내용</span>
              <Update number={200}>200</Update>
            </ChattingNUpdate>
          </ChattingInfoFrame>
        </Chat>
      </ChattingList>
      <BottomTab />
    </Wrapper>
  );
}
