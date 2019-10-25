import axios from '../request'
import DevBaseApi from './DevBaseApi'
import Constants from '@/constants/index'

const defaultOptions = { log: false, loading: false, alert: false, hardware: true }

export default Object.assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'cash/',
  /* 获取现金设备状态 */
  GetStatus(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'GetStatus', params, options: { ...defaultOptions, ...options } });
  },
  /* 设置可以接受纸币面值 */
  SetDenomination(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetDenomination', data, options: { ...defaultOptions, ...options } });
  },
  /* 取识币金额 */
  GetMoney(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'GetMoney', params, options: { ...defaultOptions, ...options } });
  },
  /* 读币口停止接收纸币 */
  StopIdentify(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'StopIdentify', params, options: { ...defaultOptions, ...options } });
  },
})