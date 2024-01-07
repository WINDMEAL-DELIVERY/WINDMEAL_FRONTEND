import { AppProps } from 'next/dist/shared/lib/router/router';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import { Container } from '@/styles/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BACKEND_URL, instance } from '@/apis';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { useRedirect } from '@hooks/routerHooks';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const redirectToLogin = useRedirect('login');

  // 요청 전에 토큰 확인해서 보내기
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const token: string = (await getCookie('token')) || '';
        if (token) {
          config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    error => Promise.reject(error),
  );

  // 토큰 만료시 갱신
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => {
      if (!error.config || !error.response) {
        alert('일시적인 네트워크 오류입니다. 잠시 후에 다시 시도해주세요.');
        console.log(error);
      }
      const requestApi = error.config;

      const isReissueRequest = error.config.url?.includes('auth/reissue');
      const isUnauthorizedError = error.response.status === 401;

      if (isReissueRequest) {
        // refresh token이 만료된 경우
        redirectToLogin();
      } else if (isUnauthorizedError) {
        try {
          const token: string = (await getCookie('token')) || '';
          if (token !== '') {
            const response = await instance.post(`${BACKEND_URL}/auth/reissue`);
            await setCookie('token', response.data.data.token);
            const newToken: string = (await getCookie('token')) || '';
            requestApi.headers = {
              Authorization: `Bearer ${newToken}`,
            };
            return await instance(requestApi);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Container>
          <Component {...pageProps} />
        </Container>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
