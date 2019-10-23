import axios from '../request'
import Constants from '@/constants/index'
import DevBaseApi from './DevBaseApi'

const baseUrl = Constants.ext_device_url + 'card/'

const defaultOptions = { log: false, loading: false, alert: false }

export default Object.assign({}, DevBaseApi, {
  /* 设置设备类型 */
  SetDeviceType(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetDeviceType', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置设备参数 */
  SetDeviceParam(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetDeviceParam', data, options: { ...defaultOptions, ...options } });
  },
  /* 获取磁卡机卡状态 */
  GetStatus(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'GetStatus', params, options: { ...defaultOptions, ...options } });
  },
  /* 允许插卡 */
  EnableInsert(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'EnableInsert', data, options: { ...defaultOptions, ...options } });
  },
  /* 禁止插卡 */
  DisableInsert(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'DisableInsert', data, options: { ...defaultOptions, ...options } });
  },
  /* 退卡 */
  EjectCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'EjectCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 吞卡 */
  RetainCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'RetainCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 读磁卡信息，就诊卡、社保卡 */
  ReadCardInfo(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'ReadCardInfo', data, options: { ...defaultOptions, ...options } });
  },
  /* 社保卡和PSAM卡上电 */
  PowerOn(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'PowerOn', data, options: { ...defaultOptions, ...options } });
  },
  /* 社保卡和PSAM卡下电 */
  PowerOff(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'PowerOff', data, options: { ...defaultOptions, ...options } });
  },
  /* 回收卡 */
  CollectCard(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'CollectCard', data, options: { ...defaultOptions, ...options } });
  },
  /* 发卡到指定读卡位置 */
  DispenseCard(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'DispenseCard', data, options: { ...defaultOptions, ...options } });
  },
  /* 发卡到门口 */
  IssueCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IssueCard', params, options: { ...defaultOptions, ...options } });
  },
})