import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKjDP1EFgVNecq0yQNd19F6sm4pk6A4cYj129HFJS/ewAG0MO4p/nEN6CZEyIAW+89EJNOoJl9pr2cDUMUYHbX8LI8jWQXN5rnZSCJjPYj5Yca+gz4WCEGw44iWZ6SJa/yq9PS2anVykQTZMtkN53h0LprFeV0SZzRT4acxzdwObB`,
  },
});
