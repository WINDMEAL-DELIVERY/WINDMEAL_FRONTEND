import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKtukTwsumZKPC+ogqYIcTtUq+hZljNMHQ1u+FoUAg3iX4n7ncaAvSN77qXbItoPYGYL+/qJ4uz1H86IJCWn1zvsbCZ0ABjBfvEKUeXOUR4ziiS8WVoZPGU4R811/7354yPFoC8SvU4DMP/enTzTCt3KVreoF7fn9FP8z4i2BIAM/`,
  },
});
