import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from 'cookies-next';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

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
    const requestApi = error.config;
    if (error.response.status === 401) {
      const token: string = (await getCookie('token')) || '';
      if (token !== '') {
        try {
          const response = await instance.post(`${BACKEND_URL}/auth/reissue`);
          await setCookie('token', response.data.data.token);
          const newToken: string = (await getCookie('token')) || '';
          requestApi.headers = {
            Authorization: `Bearer ${newToken}`,
          };
          return await instance(requestApi);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
