import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UiN+iICt1qBpLWLESt/wEqmjwLol8ZrGfs/KuJ1mUk1Za6ONNanls061yS0RrXBDdqPxc5LBvTtn3jjwC8JStN49Circ44uyJ/ndWIDGE6IR1pf1q3KrZqYTB7QhpvlYALpsnFMeQzYze8dBasQAzS314PpJRmV3GYA9EJadWMYg+4bZiO4cEMFYJNiDdfxvD+wrly6l+FQsnAeIqWlnIW6EypkZzO/9gkqSdR0CBAKLrCchRevwNpuUhjbpQtZhc4FYq1CsUAaldrE4xIo7WCw`,
  },
});
