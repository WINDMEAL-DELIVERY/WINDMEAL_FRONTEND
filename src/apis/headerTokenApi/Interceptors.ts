import { InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  try {
    const token: string = (await getCookie('token')) || '';
    if (token !== '') {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
};
