import { AppProps } from 'next/dist/shared/lib/router/router';
import { RecoilRoot } from 'recoil';
import 'styles/globals.css';
import { Container } from '@/styles/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChatInstance, instance } from '@/apis';
import { AxiosInstance, AxiosResponse } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { useRedirect } from '@hooks/routerHooks';
import { requestInterceptor } from '@apis/headerTokenApi/Interceptors';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const redirectToLogin = useRedirect('login');

  // 요청 전에 토큰 확인해서 보내기
  instance.interceptors.request.use(requestInterceptor, error =>
    Promise.reject(error),
  );

  ChatInstance.interceptors.request.use(requestInterceptor, error =>
    Promise.reject(error),
  );

  // 토큰 만료시 갱신
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleErrorResponse = async (error, thisInstance: AxiosInstance) => {
    if (!error.config || !error.response) {
      alert('일시적인 네트워크 오류입니다. 잠시 후에 다시 시도해주세요.');
      console.log(error);
    }

    const requestApi = error.config;
    const isReissueRequest = error.config.url?.includes('auth/reissue');
    const isUnauthorizedError = error.response.status === 401;

    if (isReissueRequest) {
      redirectToLogin();
    } else if (isUnauthorizedError) {
      try {
        const response = await instance.post('/auth/reissue');
        await setCookie('token', response.data.data.token);
        const newToken: string = (await getCookie('token')) || '';
        requestApi.headers = {
          Authorization: `Bearer ${newToken}`,
        };
        return await thisInstance(requestApi);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  };

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => handleErrorResponse(error, instance),
  );

  ChatInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => handleErrorResponse(error, ChatInstance),
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
