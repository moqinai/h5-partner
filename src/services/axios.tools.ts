import qs from 'qs'
import axios from 'axios'

const instance = axios.create()
// axios.defaults.baseURL = 'http://test.jvhe1.pxjy.com'
// instance.defaults.baseURL = 'http://test.jvhe.pxjy.com/'
// instance.defaults.timeout = 2500
instance.interceptors.response.use((config: any) => {
  // 返回请求正确的结果
  return config.data
}, (error: any) => {
  return Promise.reject(error)
  // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
})
const post = (url: any, params?: any) => {
  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params)).then((res: any) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}
const get = (url: any, params?: any) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((res: any) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}
export { post, get }
