import { AppProps } from 'next/dist/shared/lib/router/router';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { Container, Wrapper } from '@/styles/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Container>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </Container>
      </RecoilRoot>
    </SessionProvider>
  );
}
