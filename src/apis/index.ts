import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const CHATTING_URL = process.env.NEXT_PUBLIC_CHATTING_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export const ChatInstance = axios.create({
  baseURL: CHATTING_URL,
  withCredentials: true,
});
