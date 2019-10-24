import axios from '../request'
import Constants from '@/constants/index'
import DevBaseApi from './DevBaseApi'

const defaultOptions = { log: false, loading: false, alert: false }

export default Object.assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'readcard/',
  /* 设置设备类型 */
  SetDeviceType(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetDeviceType', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置设备参数 */
  SetDeviceParam(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetDeviceParam', data, options: { ...defaultOptions, ...options } });
  },
  /* 获取磁卡机卡状态 */
  GetStatus(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'GetStatus', params, options: { ...defaultOptions, ...options } });
  },
  /* 允许插卡 */
  EnableInsert(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'EnableInsert', data, options: { ...defaultOptions, ...options } });
  },
  /* 禁止插卡 */
  DisableInsert(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'DisableInsert', data, options: { ...defaultOptions, ...options } });
  },
  /* 退卡 */
  EjectCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'EjectCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 吞卡 */
  RetainCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'RetainCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 读磁卡信息，就诊卡、社保卡 */
  ReadCardInfo(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'ReadCardInfo', data, options: { ...defaultOptions, ...options } });
  },
  /* 社保卡和PSAM卡上电 */
  PowerOn(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'PowerOn', data, options: { ...defaultOptions, ...options } });
  },
  /* 社保卡和PSAM卡下电 */
  PowerOff(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'PowerOff', data, options: { ...defaultOptions, ...options } });
  },
})