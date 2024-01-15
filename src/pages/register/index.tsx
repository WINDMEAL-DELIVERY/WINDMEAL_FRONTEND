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
} from '@/styles/registerStyles';
import Image from 'next/image';

import Vector from '@images/Vector 2.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { GuideMessageType, InputNickNameProps } from '@type/type';
import { useMutation } from 'react-query';
import { NicknameRequest, RegisterResponse } from '@type/userType';
import { AxiosError } from 'axios';
import { checkDuplicatedNickname, setUserNickname } from '@apis/user/register';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';

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
    $validated: false,
    $error: false,
  });
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code')?.replace(/ /g, '+');

  useEffect(() => {
    if (code) {
      setCookie('token', code, {
        expires: new Date(Number(new Date()) + 7776000000), // 3개월
      });
      // router.replace('/register');
    }
  }, [code]);

  const executeErrorAnimation = () => {
    setNickNameState(prevState => ({
      ...prevState,
      $error: true,
    }));
    // error animation 이 반복해서 발생하지 않도록 하기 위해 1초마다 상태를 업데이트 하였습니다.
    setTimeout(() => {
      setNickNameState(prevState => ({
        ...prevState,
        $error: false,
      }));
    }, 1000);
  };

  const checkDuplicatedNicknameMutation = useMutation<
    RegisterResponse,
    AxiosError,
    string
  >('isDuplicated', checkDuplicatedNickname, {
    onSuccess: data => {
      // 사용 불가능한 중복된 닉네임
      if (data.data) {
        executeErrorAnimation();
        setNickNameState(prevState => ({
          ...prevState,
          $duplicated: true,
          $validated: false,
        }));
      }
      // 사용 가능한 닉네임
      else if (!data.data) {
        setNickNameState(prevState => ({
          ...prevState,
          $duplicated: false,
          $validated: true,
        }));
      }
    },
    onError: err => {
      alert(err); // 추후에 다른 방식으로 대체
    },
  });

  const registerMutation = useMutation<
    RegisterResponse,
    AxiosError,
    NicknameRequest
  >('register', (data: NicknameRequest) => setUserNickname(data), {
    onSuccess: data => {
      if (data.code === 200) {
        router.replace('/main');
      }
    },
    onError: error => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const errMessage = error.response.data.message || '';
      if (errMessage === '이미 사용 중인 닉네임입니다.') {
        executeErrorAnimation();
        setNickNameState(prevState => ({
          ...prevState,
          $duplicated: true,
          $validated: false,
        }));
      } else if (errMessage === '닉네임에는 특수문자가 포함될 수 없습니다.') {
        executeErrorAnimation();
      } else if (errMessage === '사용자를 찾을 수 없습니다.')
        executeErrorAnimation();
      else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 중복 확인 완료 후 닉네임을 다시 수정했을 때를 방지한다.
    setNickNameState(prevState => ({
      ...prevState,
      $duplicated: false,
      $validated: false,
    }));
    setNickName(e.target.value);
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
    const testSpecialChars = /[!@#$%^&*(),._?":{}|<>]/.test(nickName);
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
        <BackImageBtn onClick={() => router.replace('/login')}>
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
            $validated={nickNameState.$validated}
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
          $validated={nickNameState.$validated}
          $error={nickNameState.$error}
        >
          {(() => {
            switch (true) {
              case nickNameState.$special:
                return guideMessage.specialChar;
              case nickNameState.$duplicated && !nickNameState.$validated:
                return guideMessage.duplicated;
              case !nickNameState.$duplicated && nickNameState.$validated:
                return guideMessage.validated;
              default:
                return '';
            }
          })()}
        </ValidateNickName>
        <GetStartDiv>
          <GetStartBtn
            onClick={() => {
              registerMutation.mutate({ nickname: nickName });
            }}
          >
            <GetStartText>시작하기</GetStartText>
          </GetStartBtn>
        </GetStartDiv>
      </RegisterDiv>
    </Wrapper>
  );
}
