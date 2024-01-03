import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKvkFbmF06w3eVO56xNwGmNU/PCn9QMCvNe5PEaHPNjd4vUv5FJuyLl9jDyL2p/+sJo0jrSr2NfXlG2BdlJTqFvZ5TH200RQBbTMlN97ae0Qd0O4AhMH7hkhecik1tvCUIt9VvJ5iM4Qq6Lq2Qy45GYkAbXjXdNT8/9KSmBtBStpo`,
  },
});
