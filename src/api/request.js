import axios from 'axios'
import loading from '../components/loading/index.js'
import showalert from '../components/alert/index.js'
import localStore from '../store/local.js'
import * as logs from '../lib/logger/index.js'

const instance = axios.create({
  // 请求超时时间（20s）
  timeout: 1000 * 20
})

const getApiName = url => url.substring(url.lastIndexOf('/') + 1)

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
    desc: isError() ? res.message : getApiName(url),
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
    if (options.hardware && localStore.hospital) {
      const extInfo = JSON.parse(localStore.hospital.ext_info || "{}")
      config.headers['YYID'] = extInfo.yyid || ""
      config.headers['SBID'] = localStore.hospital.winConfig.win_code || ""
      config.headers['LogLevel'] = localStore.hospital.log_level || ""
      config.headers['Gateway'] = localStore.gateway || ""
    }
    if (localStore.authorization) {
      config.headers['Authorization'] = 'Bearer ' + localStore.authorization
    }
    if (localStore.hospital) {
      config.headers['orgId'] = localStore.orgId || ""
      config.headers['winConfigId'] = localStore.winConfigId || ""
      config.headers['deptId'] = localStore.dept_id || ""
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

/* 响应拦截 */
instance.interceptors.response.use(
  res => {
    const { options } = res.config
    options.loading !== false && isLoading(false)
    if (res.data.code === 0) {
      record('info', res)
      return Promise.resolve(res.data.data)
    } else {
      options.alert !== false && showalert(res.data.msg)
      record('warn', res)
      const error = new Error(res.data.msg || '接口调用失败，错误信息为空')
      error.failure = true
      return Promise.reject(error)
    }
  }, error => {
    // error里面有request属性就是网络错误
    if (error.request) {
      const { options } = error.config
      options.loading !== false && isLoading(false)
      options.alert !== false && showalert(`接口${getApiName(error.config.url)}响应超时，请稍后再试`)
      error.network = true
      record('error', error)
    }
    return Promise.reject(error)
  })

export default instance