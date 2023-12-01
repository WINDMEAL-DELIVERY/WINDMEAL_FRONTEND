import styled from 'styled-components';

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8%;
`;

export const MainLogoImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BigText = styled.span`
  white-space: pre-line;
  // font-family: Noto Sans KR;
  font-size: 26px;
  font-weight: 700;
  line-height: 33.48px;
  text-align: center;
`;

export const SmallText = styled.span`
  margin-top: 10%;
  // font-family: Noto Sans KR;
  font-size: 14px;
  color: #3e3a39;
  font-weight: 400;
  line-height: 20.27px;
  text-align: center;
`;

export const LoginBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18.5%;
`;

export const LoginBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15.5% 0 15.5%;
  width: 245px;
  height: 42px;
  border-radius: 20px;
  border-width: 0;
  background-color: #5776b9;
  cursor: pointer;
`;

export const LoginBtnText = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 20.27px;
  color: #ffffff;
`;
