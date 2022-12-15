import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-type": "application/json; charset=utf-8",
    "cache-control": "no-cache",
    Pragma: "no-cache",
  },
});

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * 响应回来的response中含有config、headers、request、status、statusText、data
     * config--配置 headers--响应头信息 request--原生ajax请求对象
     * 其中data是我们需要的返回数据
     */
    let res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
