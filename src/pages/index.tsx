import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SplashScreen from '@components/splash';
import { getCookie } from 'cookies-next';

function Home() {
  const router = useRouter();
  const token: string = getCookie('token') || '';

  useEffect(() => {
    setTimeout(() => {
      if (token !== '') {
        router.replace('/main');
      } else {
        router.replace('/login');
      }
    }, 2000);
  }, []);

  return <SplashScreen />;
}

export default Home;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}
