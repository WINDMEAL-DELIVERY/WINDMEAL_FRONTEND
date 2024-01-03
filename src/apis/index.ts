import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKrblsKYzl2b9934uB0pK+E6w47s+Xf7fioWwpN4d4xAiYT95kvrELxnwdA1DXJcFSJbGKePq/WtGntTPKnQYsZWt+0Fbi8V71Xj0j4E1h/rupJQwawnB2ra7cj2tpe4MrKy5Ugr2ixatA7RFy51o3UY1q8WA8x6g17UUT7geiSk/`,
  },
});
