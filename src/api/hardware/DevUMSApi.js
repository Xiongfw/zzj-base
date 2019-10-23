import axios from '../request'
import DevBaseApi from './DevBaseApi'
import Constants from '@/constants/index'

const baseUrl = Constants.ext_device_url + 'ums/'

const defaultOptions = { log: false, loading: false, alert: false }

export default Object.assign({}, DevBaseApi, {
  /* 设置入参 */
  SetReq(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetReq', data, options: { ...defaultOptions, ...options } });
  },
  /* 进卡 */
  EnterCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'EnterCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 检测卡 */
  CheckCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'CheckCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 读卡 */
  ReadCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'ReadCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 弹卡 */
  EjectCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'EjectCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 关闭读卡器 */
  CardClose(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'CardClose', params, options: { ...defaultOptions, ...options } });
  },
  /* 吞卡 */
  CardSwallow(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'CardSwallow', params, options: { ...defaultOptions, ...options } });
  },
  /* 开启密码键盘 */
  StartPin(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'StartPin', params, options: { ...defaultOptions, ...options } });
  },
  /* 获得键值 */
  GetOnePass(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'GetOnePass', params, options: { ...defaultOptions, ...options } });
  },
  /* 获取Pin密文 */
  GetPin(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'GetPin', params, options: { ...defaultOptions, ...options } });
  },
  /* 自助终端交易 */
  TransCard(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'TransCard', params, options: { ...defaultOptions, ...options } });
  },
})