import { AppProps } from 'next/dist/shared/lib/router/router';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import { Container } from '@/styles/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Container>
        <Component {...pageProps} />
      </Container>
    </RecoilRoot>
  );
}
