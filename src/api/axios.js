// 引入
import axios from "axios";

// 创建axios实例
let service = axios.create({
  timeout: 60000
});

//设置post,put默认 content-Type
service.defaults.headers.post["Content-Type"] = "application/json";
service.defaults.headers.put["Content-Type"] = "application/json";

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let { data } = response;
    return data;
  },
  error => {
    let info = {};
    let { status, statusText, data } = error.response;
    if (!error.response) {
      info = {
        code: 500,
        msg: "Network Error"
      };
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      };
    }
  }
);

/* 创建同一封转过的axios实例 */
/* @return {AxiosInstance} */
export default function() {
  return service;
}
