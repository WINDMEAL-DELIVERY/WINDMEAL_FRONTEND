import styled from 'styled-components';

export const GoBack = styled.button`
  background-color: #f5f8faff;
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
  background-color: #f5f8faff;
  font-weight: bold;
  width: 80%;
`;

export const ShopNDest = styled.div`
  font-size: small;
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
  font-size: x-large;
`;

export const Time = styled.div`
  font-size: small;
`;

export const ChattingNUpdate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;

interface UpdateProps {
  number: number;
}

export const Update = styled.div<UpdateProps>`
  display: flex;
  background-color: orangered;
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
