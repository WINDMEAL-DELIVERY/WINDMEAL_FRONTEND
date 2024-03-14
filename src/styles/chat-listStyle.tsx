import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  width: 22.5rem;
  height: 3.5rem;
  padding: 0 2rem;
  gap: 3rem;
  font-size: large;
`;

export const GoBack = styled.button`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

export const Title = styled.span`
  font-family: 'Noto Sans KR';
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.03375rem;
`;

export const ChattingList = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Chat = styled.a`
  width: 90%;
  flex-direction: row;
  display: flex;
  padding: 1rem 0;
  border: none;
  margin: 0;
  font: inherit;
  text-decoration: none;
  color: black;
  cursor: default;
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
  align-items: start;
`;

export const ShopNDest = styled.div`
  font-family: 'Noto Sans KR';
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
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.025rem;
`;

export const Time = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01875rem;
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
  font-family: 'Noto Sans KR';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  letter-spacing: -0.02188rem;
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
  font-family: 'Noto Sans KR';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  letter-spacing: -0.02188rem;
`;
