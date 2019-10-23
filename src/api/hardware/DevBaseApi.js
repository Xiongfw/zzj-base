import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.ext_device_url + 'print/'

const defaultOptions = { log: false, loading: false, alert: false }

export default {
  /* 打开打印设备串口 */
  OpenDevice(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'OpenDevice', data, options: { ...defaultOptions, ...options } });
  },
  /* 关闭打印设备串口 */
  CloseDevice(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'CloseDevice', params, options: { ...defaultOptions, ...options } });
  },
  /* 初始化打印机 */
  Init(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'Init', data, options: { ...defaultOptions, ...options } });
  }
}