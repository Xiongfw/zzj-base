import axios from '../request'

const defaultOptions = { log: true, loading: false, alert: false, hardware: true }

export default {
  /* 打开打印设备串口 */
  OpenDevice(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'OpenDevice', data, options: { ...defaultOptions, ...options } });
  },
  /* 关闭打印设备串口 */
  CloseDevice(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'CloseDevice', params, options: { ...defaultOptions, ...options } });
  },
  /* 初始化打印机 */
  Init(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'Init', data, options: { ...defaultOptions, ...options } });
  }
}