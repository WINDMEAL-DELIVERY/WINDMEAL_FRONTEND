import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GOOGLE_URL } from '@/apis';
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
} from '@styles/loginStyles';
import { LoginPageLogo } from 'public/svgs';

export default function Login() {
  const router = useRouter();

  const handleButtonClick = () => {
    console.log(GOOGLE_URL);
    router.push(GOOGLE_URL);
  };
  return (
    <Wrapper>
      <LoginDiv>
        <MainLogoImgDiv>
          <LoginPageLogo />
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
