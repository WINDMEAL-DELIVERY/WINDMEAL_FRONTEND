import styled from 'styled-components';
import ReactModal from 'react-modal';

export const ChatWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: white;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  /* 태블릿 */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 데스크탑 */
  @media screen and (min-width: 1025px) {
    width: 30%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

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
  position: fixed;
  background-color: white;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  /* 태블릿 */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50%;
  }

  /* 데스크탑 */
  @media screen and (min-width: 1025px) {
    width: 30%;
  }
`;

export const GoBack = styled.button`
  cursor: pointer;
`;

export const OppositeNickName = styled.span`
  font-weight: bold;
  width: 60%;
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
`;

export const ChattingHistory = styled.div`
  width: 90%;
  display: flex;
  padding: 4rem 1rem 1rem 1rem;
  font: inherit;
  text-decoration: none;
  color: black;
  flex-direction: column-reverse;
  overflow-y: auto;
  flex: 1;
`;

export const TimeStamp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const OpponentMessageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;

  &:not(:first-child) {
    margin-bottom: 1rem;
  }
`;

export const OpponentProfileImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
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

export const OpponentMessage = styled.div`
  padding: 1rem;
  background-color: #f2f4ff;
  border-radius: 0 1rem 1rem 1rem;
`;

export const OpponentImage = styled.img`
  width: 70%;
  height: auto;
`;

export const OpponentTimeStamp = styled.div`
  color: #a8b1ce;
  justify-content: flex-end;
  display: flex;
`;

export const MyMessageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;

  &:not(:first-child) {
    margin-bottom: 1rem;
  }
`;

export const MyMessage = styled.div`
  padding: 1rem;
  background-color: #5776b9;
  color: white;
  border-radius: 1rem 0 1rem 1rem;
`;

export const MyImage = styled.img`
  width: 70%;
  height: auto;
`;

export const MyTimeStamp = styled.div`
  color: #a8b1ce;
  margin-left: 0.5rem;
  margin-top: 0.3rem;
`;

export const ChatBottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 1vh;
`;

export const ChatInputDiv = styled.textarea`
  background-color: #f2f4ff;
  width: 248px;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  resize: none;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 조절 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 스크롤바 색상 */
  }
`;

export const OpenModalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '17.5rem',
    height: '10.5rem',
    zIndex: '150',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '1rem',
  },
};

export const IconNMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1rem;
`;
