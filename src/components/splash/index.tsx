import { Wrapper } from '@styles/styles';
import { UponLogoImage, LoginPageLogo } from 'public/svgs';
import { LoadingDiv, MainDiv } from '@components/splash/styles';

export default function splash() {
  return (
    <Wrapper>
      <MainDiv>
        <UponLogoImage
          style={{
            width: '2.5625rem',
            height: '2.228rem',
            marginTop: '13.69rem',
            marginLeft: '0.34rem',
          }}
        />
        <LoginPageLogo
          style={{
            width: '9.6875rem',
            height: '10.17656rem',
            marginTop: '1.27rem',
            marginRight: '0.35rem',
          }}
        />
        <LoadingDiv>Loading...</LoadingDiv>
      </MainDiv>
    </Wrapper>
  );
}
