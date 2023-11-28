import axios from 'axios';
import API from './config';

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;
