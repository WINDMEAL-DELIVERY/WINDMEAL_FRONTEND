import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
  gap: 3rem;
  font-size: large;
  justify-content: space-between;
`;

export const GoBack = styled.button`
  border: 0;
  cursor: pointer;
`;

export const OppositeNickName = styled.span`
  font-weight: bold;
  width: 60%;
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30%;
`;
export const Alarm = styled.div``;

export const Plus = styled.div``;

export const ChattingHistory = styled.div`
  width: 90%;
  flex-direction: column;
  display: flex;
  padding: 1rem;
  font: inherit;
  text-decoration: none;
  color: black;
  cursor: default;
`;

export const OpponentMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-bottom: 1rem;
`;

export const OpponentProfileImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-color: black;
`;

export const OpponentNicknameNMessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  gap: 0.3rem;
`;

export const OpponentNickName = styled.div`
  font-weight: bold;
`;

export const Message = styled.div`
  padding: 1rem;
  background-color: #f2f4ff;
  border-radius: 0 1rem 1rem 1rem;
`;

export const OpponentTimeStamp = styled.div`
  color: #a8b1ce;
  justify-content: flex-end;
  display: flex;
`;

export const MyMessage = styled.div``;
