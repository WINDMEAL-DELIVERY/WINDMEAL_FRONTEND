import Image from 'next/image';
import {
  ImagesDiv,
  MainLogoImageDiv,
  UponLogoImageDiv,
  Wrapper,
} from '@components/splash/styles';
import UponMainLogo from '@images/UponMainLogo.png';
import MainLogo from '@images/MainLogo.png';

export default function splash() {
  return (
    <Wrapper>
      <ImagesDiv>
        <UponLogoImageDiv>
          <Image
            src={UponMainLogo}
            alt="가천종로고"
            style={{ width: '100%', height: '100%' }}
          />
        </UponLogoImageDiv>
        <MainLogoImageDiv>
          <Image
            src={MainLogo}
            alt="바람개비 딜리버리 메인로고"
            style={{ width: '100%', height: '100%' }}
          />
        </MainLogoImageDiv>{' '}
        <div>Loading...</div>
      </ImagesDiv>
    </Wrapper>
  );
}
