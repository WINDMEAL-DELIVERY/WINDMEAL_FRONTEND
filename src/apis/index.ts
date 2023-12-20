import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UiN+iICt1qBpLWLESt/wEqmjwLol8ZrGfs/KuJ1mUk1Za6ONNanls061yS0RrXBDdqPxc5LBvTtn3jjwC8JStN49Circ44uyJ/ndWIDGE6IR8wD+Kkv229nl6rUuClcp2DRGl0HG+UtgugUgeRcR3Di2GkocNDFQsn5YILj9qOzd0ut+OA9d1ZzNo0bTMF0BjszyWHxFM8FYahhcnpfy2l2HhY5L5ksyPZsnoVe1zUEV3APWY+SjjP8Lck+kH6AfqkeKYLGBP+lHyoz5makISoA`,
  },
});
