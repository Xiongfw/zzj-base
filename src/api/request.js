import axios from 'axios'
import loading from '../components/loading/index.js'
import showalert from '../components/alert/index.js'
import localStore from '../store/local.js'
import * as logs from '../lib/logger/index.js'

const instance = axios.create({
  // 请求超时时间（60s）
  timeout: 1000 * 15
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
  if (options.log === false) return
  outInfo[level]()
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
    if (options.yibao && localStore.hospital) {
      const extInfo = JSON.parse(localStore.hospital.ext_info || "{}")
      config.headers['YYID'] = extInfo.yyid || ""
      config.headers['SBID'] = localStore.hospital.winConfig.win_code
    }
    if (localStore.authorization) {
      config.headers['Authorization'] = 'Bearer ' + localStore.authorization
    }
    if (localStore.hospital) {
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
      const error = new Error(res.data.msg || '接口异常->' + JSON.stringify(res.data))
      error.failure = true
      return Promise.reject(error)
    }
  }, error => {
    isLoading(false)
    // error里面有request属性就是网络错误
    if (error.request) {
      const { options } = error.config
      options.alert !== false && showalert('网络异常，请稍后再试')
      record('error', error)
    }
    return Promise.reject(error)
  })

export default instance