// 引入axios
import axios from "axios";
import Cookies from "js-cookie";
import bus from "../util/bus";
import route from "../router";

// 封装axios
const myAxios = axios.create({
  // 会给所有的请求加上/api
  baseURL:
    process.env.NODE_ENV === "production" ? "http://fapi.mimanduo.xyz" : "/req"
  // baseURL: '/req'
});

//发送请求 -> 请求拦截器 -> 服务器响应 -> 响应拦截器 ->拿到数据
// 请求拦截器
myAxios.interceptors.request.use(
  function(config) {
    const token = Cookies.get("tokenAccess") || "";
    config.headers["tokenAccess"] = token;
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 给响应数增加拦截
myAxios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // status ==200请求成功
    // 只要data里面的  不关心请求头  或者请求体  只关心响应
    if (response.status === 200) {
      // if (response.data.code === "-1") {
      //   // return response.data
      //   bus.$message.error("请重新登录");
      //   route.push("/login");
      // }
      return response.data;
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default myAxios;
