import styled, { css } from 'styled-components';
import { InputNickNameDivProps } from '@type/type';

export const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  height: 90px;
  gap: 10px;
  padding-left: 2%;
  background-color: white;
`;
export const BackImageBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0;
  background-color: white;
  cursor: pointer;
  width: 20px;
  height: 40%;
`;

export const HeaderTitle = styled.span`
  display: flex;
  font-size: 22px;
  font-weight: 500;
  line-height: 31.6px;
  height: 40%;
  background-color: white;
  align-items: center;
  // font-family: Noto Sans KR;
`;

export const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 15% 10% 15% 10%;
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BigText = styled.span`
  white-space: pre-line;
  // font-family: Noto Sans KR;
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 35px;
`;
export const SmallText = styled.span`
  white-space: pre-line;
  // font-family: Noto Sans KR;
  font-size: 1rem;
  color: #3e3a39;
  font-weight: 400;
  line-height: 21px;
  margin-top: 5%;
`;

export const NickNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 35%;
`;

export const NickNameText = styled.span`
  // font-family: Noto Sans KR;
  font-size: 21px;
  font-weight: 500;
  line-height: 23.17px;
  color: #3e3a39;
`;

export const InputNickNameDiv = styled.div<InputNickNameDivProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 94%;
  padding: 0 0 1% 0;

  ${({ isFocused }) => css`
    transition: border-color 0.3s ease;
    border-bottom: 1px solid ${isFocused === 'true' ? '#5776b9' : '#d9d9d9'};
  `}
`;

export const InputNickName = styled.input`
  width: 70%;
`;

export const DoubleCheckBtn = styled.button`
  width: 22%;
  height: 27px;
  border-radius: 11px;
  border: 1px solid #5776b9;
  background-color: white;
`;

export const DoubleCheckText = styled.span`
  color: #5776b9;
  font-size: 14px;
`;

export const ValidateNickName = styled.div`
  width: 93%;
  height: 27px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  font-size: 12px;
  font-weight: 400;
`;
export const GetStartDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 26vh;
  background-color: white;
`;

export const GetStartBtn = styled.button`
  width: 170px;
  height: 42px;
  background-color: #5776b9;
  border-radius: 20px;
`;

export const GetStartText = styled.span`
  color: #f5f5f5;
  font-size: 16px;
  font-weight: 400;
`;
