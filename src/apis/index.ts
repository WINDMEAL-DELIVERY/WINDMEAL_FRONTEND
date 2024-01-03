import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKgUx7uP12Jf3oXKUzbBUypm79xFcbIhdXL2YaS6+DIufyYEoSlupg1oVPjWr3gHXC8f1DJ1QUIVu2zgOKnDa5NN7RgrOaVwuA7rz5GsOzT9Yj3dDZuRzXkIH/6rpYqPJv6YxgHX7IaN3KJtFoC65H3ynrP4PmXrbZSHKEvpv2tHg`,
  },
});
