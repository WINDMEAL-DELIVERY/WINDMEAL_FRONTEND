import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UhU9Vud860S3KL2husnbJpMEdSO61zSM4eJdJD0f+A3YhAcFzhRFXRikEt6h9CzXRuA194FyNKuO3sgxOdqowxP5rTeHyLZAaK0cVY2A8rQKmFlhEPAYmqCrQgAsAw8E+eWvqHwh7Q8YtxIelWy4jbq2/rW3zPz4+n3yZ0PLuJlwHNf5H/qBs663t8qXf4sKx/gp88bUo8Mgo5u6NlFNdrY+OUumEqDjuPOUsgXWvB/y/Lgdcy2TZhNIX0rpiyOFKOdYUFb3+88ZSL844zVSzSY`,
  },
});
