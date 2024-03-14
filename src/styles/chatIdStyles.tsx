import styled from 'styled-components';
import ReactModal from 'react-modal';

export const ChatWrapper = styled.div`
  height: 100vh;
  overflow: auto;
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
  width: 22.5rem;
  height: 3.5rem;
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
  width: 1.5rem;
  height: 1.5rem;
`;

export const OppositeNickName = styled.span`
  width: 12.9375rem;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.025rem;
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
  font-family: 'Noto Sans KR';
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01875rem;
`;

export const OpponentMessageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const OpponentProfileImage = styled.div<{ src: string }>`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
`;

export const OpponentNicknameNMessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  gap: 0.3rem;
`;

export const OpponentNickName = styled.div`
  ont-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.025rem;
`;

export const OpponentMessage = styled.div`
  display: flex;
  padding: 0.625rem 0.9375rem;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  background-color: #f2f4ff;
  border-radius: 0 0.625rem 0.625rem 0.625rem;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.025rem;
`;

export const OpponentImage = styled.img`
  width: 70%;
  height: auto;
`;

export const OpponentTimeStamp = styled.div`
  color: #a8b1ce;
  justify-content: flex-end;
  display: flex;
  font-family: 'Source Sans Pro';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const MyMessageDiv = styled.div`
  display: flex;
  padding: 0.625rem 0.9375rem;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const MyMessage = styled.div`
  padding: 0.625rem 0.9375rem;
  gap: 0.5rem;
  background-color: #5776b9;
  color: white;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.025rem;
  border-radius: 1rem 0 1rem 1rem;
`;

export const MyImage = styled.img`
  width: 70%;
  height: auto;
`;

export const MyTimeStamp = styled.div`
  font-family: 'Source Sans Pro';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #a8b1ce;
`;

export const ChatBottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 1vh;
  height: 3.5rem;
`;

export const ChatInputDiv = styled.textarea`
  background-color: #f2f4ff;
  width: 15.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  resize: none;
  font-family: 'Source Sans Pro';

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
