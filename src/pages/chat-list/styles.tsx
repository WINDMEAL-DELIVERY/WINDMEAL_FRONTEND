import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  width: 55%;
  height: 4rem;
  padding: 0 2rem;
  gap: 3rem;
  font-size: large;
`;

export const GoBack = styled.button`
  border: 0;
  cursor: pointer;
`;

export const Title = styled.span`
  font-weight: bold;
`;

export const ChattingList = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Chat = styled.div`
  width: 90%;
  flex-direction: row;
  display: flex;
  padding: 1rem;
`;

export const ProfileImageFrame = styled.div`
  align-items: center;
  width: 5rem;
  height: 5rem;
`;

export const ProfileImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

export const ChattingInfoFrame = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 3.3% 0 3.3% 3%;
  font-weight: bold;
  width: 80%;
`;

export const ShopNDest = styled.div`
  font-size: small;
  padding-bottom: 0.3rem;
`;

export const NickNameNTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
  margin-bottom: 0.5rem;
`;

export const NickName = styled.div`
  font-size: large;
`;

export const Time = styled.div`
  color: #797c7b;
  opacity: 50%;
`;

export const ChattingNUpdate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;

export const LastMessage = styled.div`
  color: #696e82;
`;

interface UpdateProps {
  number: number;
}

export const Update = styled.div<UpdateProps>`
  display: flex;
  background-color: #5776b9;
  color: white;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  width: ${props => {
    const { number } = props;
    if (number < 10) {
      return '1rem';
    }
    if (number < 100) {
      return '2rem';
    }
    return '3rem';
  }};
`;

export const UpdateNums = styled.div`
  padding-top: 0.1rem;
`;
