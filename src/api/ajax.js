// 引入axios
// import axios from 'axios';

// var instance = axios.create({
//   baseURL: 'http://localhost:3000/',
//   timeout: 1000,
//   headers: {'X-Requested-With': 'XMLHttpRequest'}
// });
// axios.defaults.timeout = 60000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

/*
import {MessageBox, Toast} from 'mint-ui'

axios.defaults.timeout = 50000 //默认请求超时时间
// axios.defaults.headers = 'application/json;charset=utf-8'

// 封装的get方法
export function getHttp (url, params = {}) {
  // 创建动画mint-ui
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // })
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
        //  Indicator.close() // // 关闭动画
      })
      .catch(err => {
        reject(err)
        //  Indicator.close() // // 关闭动画
        MessageBox.alert('message', err)
      })
  })
}

// 封装的post方法
export function postHttp (url, data = {}) {
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // })
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.data.status == 1) {
          resolve(response.data)
        } else {
          Toast(response.data.msg)
        }
        // Indicator.close() // // 关闭动画
      }, (err) => {
        reject(err)
        // Indicator.close()
      })
  })
}
*/
