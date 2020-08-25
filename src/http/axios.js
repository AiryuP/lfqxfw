import axios from 'axios' 
axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://192.168.1.109:8000'
axios.defaults.baseURL = window.myUrl.baseURL

// axios.interceptors.request.use(
//     config => {
//       if (sessionStorage.token) { //判断token是否存在
//         config.headers.Authorization = 'Bearer ' +  sessionStorage.token;  //将token设置成请求头
//       }
//       return config;
//     },
//     err => {
//       return Promise.reject(err);
//     }
// );


export default axios