import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKjoYDke+LXezY+5luQNBaVv9Wq7cqc2z0syjCpxXc5ulX0fPK3u/NRZs0YkvTbv83VIL3PGpaxlTpbGxec5pGPYs/+3Qw33OQ5DNUUiFJP2ettabPJRQGLuvEwT81Nua6cxPQNe+BGyg4egIhdj93EgqJEM/LIEvUNSetR420Q7L`,
  },
});
