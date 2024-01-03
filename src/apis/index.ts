import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKr1Q9QCv8D2iCgrqWJJoN+HzNoFfz2qI4LQRx3MI9rtPtC3v4hs+XM84rb49KSLqGCt077iCmQpSEqO1RRhYLlg7I/HS4XMSNz/KJ5tYv3RbY+/0ISdnFTeNwu/yjWqQJcbtHmJd1uKzsVLGlbr69Exr0mO9SECEmVHjAKmbQoqw`,
  },
});
