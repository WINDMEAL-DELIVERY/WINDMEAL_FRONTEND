import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import Image from 'next/image';

import LoginPageLogo from '@images/LoginPageLogo.svg';
import LoginBtnLogo from '@images/LoginBtnLogo.png';
import {
  BigText,
  LoginBtn,
  LoginBtnDiv,
  LoginBtnText,
  LoginDiv,
  MainLogoImgDiv,
  SmallText,
  TextDiv,
} from '@pages/login/styles';

export default function Login() {
  const router = useRouter();
  const GOOGLE_LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;

  const handleButtonClick = () => {
    router.push(GOOGLE_LOGIN_URL);
  };
  return (
    <Wrapper>
      <LoginDiv>
        <MainLogoImgDiv>
          <Image
            src={LoginPageLogo}
            alt="바람개비 딜리버리 메인로고"
            style={{ width: '40%', height: '40%' }}
          />
        </MainLogoImgDiv>
        <TextDiv>
          <BigText>바람개비 딜리버리에{'\n'}오신 것을 환영합니다!</BigText>
          <SmallText>커피 한 잔의 여유, 즐길 준비 되셨나요?</SmallText>
        </TextDiv>
        <LoginBtnDiv>
          <LoginBtn type="button" onClick={handleButtonClick}>
            <Image src={LoginBtnLogo} alt="로그인 버튼 로고" />
            <LoginBtnText>Google 간편 로그인 하기</LoginBtnText>
          </LoginBtn>
        </LoginBtnDiv>
      </LoginDiv>
    </Wrapper>
  );
}
