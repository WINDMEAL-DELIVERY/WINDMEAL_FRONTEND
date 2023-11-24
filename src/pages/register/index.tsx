import { Wrapper } from '@styles/styles';
import {
  BackImageBtn,
  BigText,
  DoubleCheckBtn,
  DoubleCheckText,
  GetStartBtn,
  GetStartDiv,
  GetStartText,
  HeaderBar,
  HeaderTitle,
  InputNickName,
  InputNickNameDiv,
  NickNameDiv,
  NickNameText,
  RegisterDiv,
  SmallText,
  TextDiv,
  ValidateNickName,
} from '@pages/register/styles';
import Image from 'next/image';

import Vector from '@images/Vector 2.svg';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { InputNickNameProps } from '@type/type';

export default function Register() {
  const [nickName, setNickName] = useState('');
  const [nickNameState, setNickNameState] = useState<InputNickNameProps>({
    isFocused: 'false',
    hasSpecialChar: 'false',
    isDuplicated: 'false',
  });

  const handleNickNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNickName(e.target.value);
    },
    [],
  );

  useEffect(() => {
    const test = /[!@#$%^&*(),.?":{}|<>]/.test(nickName);
    if (test) {
      setNickNameState(prevState => ({
        ...prevState,
        hasSpecialChar: 'true',
      }));
    } else {
      setNickNameState(prevState => ({
        ...prevState,
        hasSpecialChar: 'false',
      }));
    }
  }, [nickName]);

  return (
    <Wrapper>
      <HeaderBar>
        <BackImageBtn>
          <Image
            src={Vector}
            alt="뒤로가기 버튼"
            style={{ width: '10px', height: '17px' }}
          />
        </BackImageBtn>
        <HeaderTitle>회원가입</HeaderTitle>
      </HeaderBar>
      <RegisterDiv>
        <TextDiv>
          <BigText>
            바람개비 딜리버리에서{'\n'}사용하고 싶은{'\n'}닉네임을 적어주세요!
          </BigText>
          <SmallText>
            바람개비 딜리버리는 사용자의{'\n'}개인정보와 익명성을 보장하기 위해
            {'\n'}닉네임이 필요해요.
          </SmallText>
        </TextDiv>
        <NickNameDiv>
          <NickNameText>닉네임</NickNameText>
          <InputNickNameDiv
            isFocused={nickNameState.isFocused}
            hasSpecialChar={nickNameState.hasSpecialChar}
            isDuplicated={nickNameState.isDuplicated}
          >
            <InputNickName
              type="text"
              value={nickName}
              onFocus={() => {
                setNickNameState(prevState => ({
                  ...prevState,
                  isFocused: 'true',
                }));
              }}
              onBlur={() => {
                setNickNameState(prevState => ({
                  ...prevState,
                  isFocused: 'false',
                }));
              }}
              onChange={handleNickNameChange}
              placeholder="닉네임을 입력해 주세요."
            />
            <DoubleCheckBtn type="button">
              <DoubleCheckText>중복확인</DoubleCheckText>
            </DoubleCheckBtn>
          </InputNickNameDiv>
        </NickNameDiv>
        <ValidateNickName>
          {nickNameState.hasSpecialChar === 'true'
            ? '닉네임은 특수문자를 포함할 수 없어요.'
            : ''}
        </ValidateNickName>
        <GetStartDiv>
          <GetStartBtn>
            <GetStartText>시작하기</GetStartText>
          </GetStartBtn>
        </GetStartDiv>
      </RegisterDiv>
    </Wrapper>
  );
}
