/**
 * Created by bootdo.
 */
import Vue from 'vue'
import axios from 'axios'
import store from "../vuex/store";
import router from '@/router'
import {message} from 'ant-design-vue'
Vue.use(message);
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头


//添加一个请求拦截器
axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('access-token')) {
      config.headers.Authorization = window.localStorage.getItem('access-token');
    }
    store.state.loading = true
    return config
  },
  error => {
      return Promise.reject(error)
  }
);
// 添加一个响应拦截器
axios.interceptors.response.use(response=> {
    store.state.loading = false;

    if (parseInt(response.data.code) === 401) {
      //未登录
        router.replace({
            path: '/login',
        })
    }

  return response;
}, error=> {
    if (parseInt(error.response.status) === 404) {
        //网络不通

        message.info("网络不通")


    }
  // Do something with response error
  return Promise.reject(error);
});

//基地址
/*let base = "http://114.115.178.160:8002"*/
let base = "http://localhost:8002"


//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {
    params: params
  }).then(res => res.data)
}
export const POSTOUT = (url, params) => {
  return axios.post(`${base}${url}`, {
    params: params

  },{responseType: "blob"}).then(res => res.data)
}
export const GETOUT = (url, params) => {
  return axios.get(`${base}${url}`, {
    params: params

  },{responseType: "blob"}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {
    params: params
  }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
