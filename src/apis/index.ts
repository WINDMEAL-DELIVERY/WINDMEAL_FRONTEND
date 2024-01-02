import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKk4OXAomUZXslhLB9AAv2P5vg5/yyAd2O2TjmPyhDIMZ/JKN3O4xinX3M43sKfQ5UW/O/5qUBI2Ck9rYpG25DP7zKK52l0TAthm3/v2Xh41Ixhr2vNcCQm8AQb5UG7nOJWKKkpQsvpb8ptlQMwvDOJ/Xz+lr45v0eDC8isEc9nMq`,
  },
});
