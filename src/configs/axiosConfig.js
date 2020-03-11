import axios from 'axios'
import { Message } from 'element-ui'
import cookies from 'vue-cookies'
import router from '../router/index'
// axios 配置
const apiAxios = axios.create({
  timeout: 10000,
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  // baseURL: 'http://127.0.0.1:8080/'
  baseURL: 'http://www.qiaohserver.cn/javaee-group2-api/'
})

// 添加请求拦截器
apiAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers = {'X-Access-Token': cookies.get('X-Access-Token')}
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
apiAxios.interceptors.response.use(function (response) {
  // 对响应数据做什么
  return response
}, function (error) {
  // 对响应错误
  const {
    status,
    data
  } = error.response
  switch (status) {
    case 401:
      Message({
        message: '登录失效，请重新登录',
        type: 'error'
      })
      router.replace('/login')
      break
    case 500:
      Message({
        message: data.error.message,
        type: 'error'
      })
      break
    case 403:
      Message({
        message: data.error.message,
        type: 'error'
      })
      break
    default:
      Message({
        message: data.error.message,
        type: 'error'
      })
  }
  return Promise.reject(error)
})
export default apiAxios
