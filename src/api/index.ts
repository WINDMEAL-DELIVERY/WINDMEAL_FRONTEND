import axios from 'axios';
import API from './config';

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

const authorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: false, // 요청보낼 때 자격 증명 정보(인증 헤더 등)을 포함시킴
});

authorizationClient.interceptors.request.use(config => {
  return Object.assign(config, {
    headers: {
      Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UiN+iICt1qBpLWLESt/wEqmjwLol8ZrGfs/KuJ1mUk1Za6ONNanls061yS0RrXBDdqPxc5LBvTtn3jjwC8JStN49Circ44uyJ/ndWIDGE6IRxPztU2oLpJRqudRcNldXILZhGpTs7/9WFFzSj37yniK7FPtg0l8lv8m1m5Tie7npmqnTiE7YefR06ffEcY/vwlGmxwU6idv+vFDgRFwGGmy//MdErXVVQWa3XxhWOo+sMLrhoCXjSRZVkz6RnW7mu5bZt/8kwcyFMpwUYWPSLng`,
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
});

export { authorizationClient };

// 토큰 붙이는거 하고 cms api 파일 만들어서 api 만들고
// 인풋
