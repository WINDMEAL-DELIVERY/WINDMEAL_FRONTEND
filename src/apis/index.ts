import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKnFfphC83oPAw/A53WELnttUORWywno/ymG5q09rlWwS0p/5NaOYsyfd0Nk/VSob2qRiKCssHjn8MX3nQEc0iArWU/FEFaalC77mshlPTVJ0ZqEx9OUXd28KljqzYeyiuUqhtJlvxq64V4sYduvg32+zqYXHVoYnSA31e4BK6ttD`,
  },
});
