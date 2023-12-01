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
import { ChangeEvent, useEffect, useState } from 'react';
import { GuideMessageType, InputNickNameProps } from '@type/type';
import { useMutation } from 'react-query';
import { NicknameDuplicateResponse } from '@type/userType';
import { AxiosError } from 'axios';
import { checkDuplicatedNickname } from '@apis/user/register';

export default function Register() {
  const guideMessage: GuideMessageType = {
    specialChar: '닉네임은 특수문자를 포함할 수 없어요.',
    duplicated: '중복된 닉네임이에요.',
    validated: '사용 가능한 닉네임이에요.',
  };
  const [nickName, setNickName] = useState<string>('');
  const [nickNameState, setNickNameState] = useState<InputNickNameProps>({
    $focused: false,
    $special: false,
    $duplicated: false,
    $error: false,
  });

  const checkDuplicatedNicknameMutation = useMutation<
    NicknameDuplicateResponse,
    AxiosError,
    string
  >('isDuplicated', checkDuplicatedNickname, {
    onSuccess: data => {
      alert(data.success);
    },
    onError: err => {
      alert(err);
    },
  });

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const executeErrorAnimation = () => {
    setNickNameState(prevState => ({
      ...prevState,
      $error: true,
    }));
    // error animation 이 반복해서 발생하지 않도록 하기 위해 3초마다 상태를 업데이트 하였습니다.
    setTimeout(() => {
      setNickNameState(prevState => ({
        ...prevState,
        $error: false,
      }));
    }, 3000);
  };

  const handleCheckDuplicate = () => {
    // 닉네임이 입력되지 않았는데 '중복 확인'버튼을 눌렀다.
    // 특수문자가 존재하는데 '중복 확인'버튼을 눌렀다.
    if (nickNameState.$special || nickName === '') {
      executeErrorAnimation();
    } else {
      checkDuplicatedNicknameMutation.mutate(nickName);
    }
  };

  useEffect(() => {
    // 특수문자를 확인한다.
    const testSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(nickName);
    if (testSpecialChars) {
      setNickNameState(prevState => ({
        ...prevState,
        $special: true,
      }));
    } else {
      setNickNameState(prevState => ({
        ...prevState,
        $special: false,
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
            $focused={nickNameState.$focused}
            $special={nickNameState.$special}
            $duplicated={nickNameState.$duplicated}
            $error={nickNameState.$error}
          >
            <InputNickName
              type="text"
              value={nickName}
              maxLength={13}
              onFocus={() => {
                setNickNameState(prevState => ({
                  ...prevState,
                  $focused: true,
                }));
              }}
              onBlur={() => {
                setNickNameState(prevState => ({
                  ...prevState,
                  $focused: true,
                }));
              }}
              onChange={handleNickNameChange}
              placeholder="닉네임을 입력해 주세요."
            />
            <DoubleCheckBtn type="button" onClick={handleCheckDuplicate}>
              <DoubleCheckText>중복확인</DoubleCheckText>
            </DoubleCheckBtn>
          </InputNickNameDiv>
        </NickNameDiv>
        <ValidateNickName
          $focused={nickNameState.$focused}
          $special={nickNameState.$special}
          $duplicated={nickNameState.$duplicated}
          $error={nickNameState.$error}
        >
          {nickNameState.$special ? guideMessage.specialChar : ''}
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
