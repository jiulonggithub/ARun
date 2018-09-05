import axios from 'axios';
import qs from 'qs';
// import localStorage from '../utils/localStorage';

let callback403 = () => {};

// Request interceptor
axios.interceptors.request.use(config => {
      // console.log('config', config)
        let token = global.token;
        // console.log('token',token);
        if (token !== '' && token !== undefined && token !== null) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        // console.log('config',config);
        return config
  },
  error => {
      return Promise.reject(error)
  }
);

// Response interceptor
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // process error 4** or 58**
        if (error.response) {
            switch (error.response.status) {
                case 400:
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    storage.remove({key:'token'});
                    break
            }
        }
        return Promise.reject(error)
    }
);



/**
 * 封装的`post`方法，所有非文件类型数据都使用`application/x-www-form-urlencoded`格式
 * **/
let axiosPost = axios.post.bind(axios);
axios.post = function (url, data, config) {
  config = config || {};
  config.headers = Object.assign({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, config.headers || {});
  data = qs.stringify(data || {});
  return axiosPost(url, data, config);
};

/**
 * 封装的`upload`方法，所有包含文件（如图片，视频）的请求使用`multipart/form-data`格式
 * `formData`是`FromData`的对象，例如：
 *  let form = new FormData();
 *  form.append('avatarFile', {
 *    uri: response.uri,
 *    type: 'image/jpg',
 *    name: 'photo.jpg'
 *  });
 **/
axios.upload = function (url, formData, config) {
  config = config || {};
  config.headers = Object.assign({
    'Content-Type' : 'multipart/form-data',
  }, config.headers || {});
  return axiosPost(url, formData, config);
};

export default axios;


/**
 * 注册403回调
 * **/
export function register403Callback(cb) {
  callback403 = cb;
}
