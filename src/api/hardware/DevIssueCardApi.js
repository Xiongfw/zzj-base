import axios from '../request'
import Constants from '@/constants/index'
import DevBaseApi from './DevBaseApi'

const defaultOptions = { log: false, loading: false, alert: false }

export default Object.assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'card/',
  /* 设置设备类型 */
  SetDeviceType(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetDeviceType', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置设备参数 */
  SetDeviceParam(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetDeviceParam', data, options: { ...defaultOptions, ...options } });
  },
  /* 获取卡箱状态 */
  GetCardBoxStatus(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'GetCardBoxStatus', data, options: { ...defaultOptions, ...options } });
  },
  /* 回收卡 */
  CollectCard(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'CollectCard', data, options: { ...defaultOptions, ...options } });
  },
  /* 发卡到指定读卡位置 */
  DispenseCard(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'DispenseCard', data, options: { ...defaultOptions, ...options } });
  },
  /* 读磁卡信息，就诊卡、社保卡 */
  ReadCardInfo(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'ReadCardInfo', data, options: { ...defaultOptions, ...options } });
  },
  /* 发卡到门口 */
  IssueCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'IssueCard', params, options: { ...defaultOptions, ...options } });
  },
})