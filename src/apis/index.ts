import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UiN+iICt1qBpLWLESt/wEqmjwLol8ZrGfs/KuJ1mUk1Za6ONNanls061yS0RrXBDdqPxc5LBvTtn3jjwC8JStN49Circ44uyJ/ndWIDGE6IR40qE8giGqjXUDY5o2L2ufVW/pXPHcJVSX0eTeEnRG5YNb8+3z7HIGvpzcRqHuTsW2f1ZEWjP26sCzCyq+JpStU8JZK5jz+3vEXCxM79EgVc/Y+94NOiPJQzTedIRtscs+OFnJh5zhaCMyNrNavXvxHgSGBaBJPffdA283NWmiUQ`,
  },
});
