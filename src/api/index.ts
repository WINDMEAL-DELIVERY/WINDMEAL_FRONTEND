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
      Authorization: `Bearer B9WCglL7eESaXHvrM64WlX8XS5mnrAhwB0ygkO3t9UiN+iICt1qBpLWLESt/wEqmjwLol8ZrGfs/KuJ1mUk1Za6ONNanls061yS0RrXBDdqPxc5LBvTtn3jjwC8JStN49Circ44uyJ/ndWIDGE6IRxnK2K1PNZjnM3kd8YahXy5RWsd6ISZ+YXJhfm594p0ZgkkTvxyyR7jqUz/8Q7L3DjKBsD7rfj0GsJf1Jl3bI03ik8cK9en4nh8FTHS7+XTRl/ciFNLvwYSd52ZGNkET2WWBit1BSfEj3YDhWvsMzm9OezbFyQ8Fx19FwTf9Ub//`,
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
});

export { authorizationClient };

// 토큰 붙이는거 하고 cms api 파일 만들어서 api 만들고
// 인풋
