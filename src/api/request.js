import axios from 'axios'
import loading from '../components/loading/index.js'
import showalert from '../components/alert/index.js'
import localStore from '../store/local.js'
import crypto from "crypto"
import * as logs from '../lib/logger/index.js'

const instance = axios.create({
  // 请求超时时间（60s）
  timeout: 1000 * 60
})

/** 是否显示加载动画 */
function isLoading(status) {
  if (status) {
    loading.show()
  } else {
    loading.close()
  }
}

/**
 * 记录接口
 * @param {string} level 日志等级 info, warn, error
 * @param {object} res axios响应对象
 */
function record(level, res) {
  const { config } = res
  const { options, url } = config
  const isError = () => res instanceof Error
  const outInfo = {
    'info': () => {
      console.log('%c执行URL=>%s\n执行成功，返回结果=>%o', 'color: #67C23A;font-weight:bold;', url, res.data.data)
    },
    'warn': () => {
      console.log('%c执行URL=>%s\n执行失败，返回结果=>%o', 'color: #E6A23C;font-weight:bold;', url, res.data)
    },
    'error': () => {
      console.log('%c执行异常\n请求URL=>%s', 'color:#F56C6C;font-weight:bold;', url)
    }
  }
  outInfo[level]()
  if (options.log === false) return
  logs[level]({
    type: 'api',
    desc: isError() ? res.message : url.substring(url.lastIndexOf('/') + 1),
    url: url,
    in_param: Object.assign({}, config.params, JSON.parse(config.data || '{}')),
    out_param: res.data
  })
}

/* 请求拦截 */
instance.interceptors.request.use(
  config => {
    const { options } = config
    options.loading !== false && isLoading(true)
    if (localStore.hospital) {
      let theData = localStore.orgId + localStore.hospital.hosp_code + localStore.hospital.oper_pwd
      if (theData) {
        let md5 = crypto.createHash("md5")
        md5.update(theData)
        let BermToken = md5.digest("hex")
        config.headers['BermToken'] = BermToken
      }
      config.headers['orgId'] = localStore.orgId
      config.headers['winConfigId'] = localStore.winConfigId
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

/* 响应拦截 */
instance.interceptors.response.use(
  res => {
    isLoading(false)
    const { options } = res.config
    if (res.data.code === 0) {
      record('info', res)
      return Promise.resolve(res.data.data)
    } else {
      options.alert !== false && showalert(res.data.msg)
      record('warn', res)
      return Promise.reject(new Error(res.data.msg))
    }
  }, error => {
    isLoading(false)
    showalert(error.config ? '网络异常，请稍后再试' : error.message)
    error.config && record('error', error)
    return Promise.reject(error)
  })

export default instance