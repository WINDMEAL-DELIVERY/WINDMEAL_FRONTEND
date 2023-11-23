import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SplashScreen from '@components/splash';

function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/main');
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
