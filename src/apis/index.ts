import axios from 'axios';

export const GOOGLE_URL = process.env.NEXT_PUBLIC_LOGIN_URL as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UiN+iICt1qBpLWLESt/wEqmjwLol8ZrGfs/KuJ1mUk1Za6ONNanls061yS0RrXBDdqPxc5LBvTtn3jjwC8JStN49Circ44uyJ/ndWIDGE6IR1FJDhsXty5y8Sap/gtfocOB7DyysXFEQ3gU0b8zLjQmeAeBNdUNG/mtSyHPPzA85li+v8x3H15G2Y8qWbaePDVNNlZDFMRDcatqEmYzpLKRsZsuGE9km1/jp4l0cZNGgnPTxhk39ecNLhFCaQZd8k8CRZnffwmcDdxpgjFQFlgf`,
  },
});
