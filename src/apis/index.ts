import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKpoznGigf/PvHqQh7DRgNf8ki9OSTLmLiMDXkbGZm7LUp/Ya+LWRZcCl1SUAE8Idlhwm5zcxQ4GvGoCzpi9tbG8MY5Eyf4xfTPWLvalJ+D9yqD9lUwWsl/7ht9VvO9pH0UWIMkv28K4FHqLiYuhwsqrnp5smB+HyZcQVTEAACAQ0`,
  },
});
