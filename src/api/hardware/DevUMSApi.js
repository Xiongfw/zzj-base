import axios from '../request'
import DevBaseApi from './DevBaseApi'
import Constants from '@/constants/index'

const defaultOptions = { log: false, loading: false, alert: false, hardware: true }

export default Object.assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'ums/',
  /* 设置入参 */
  SetReq(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetReq', data, options: { ...defaultOptions, ...options } });
  },
  /* 进卡 */
  EnterCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'EnterCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 检测卡 */
  CheckCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'CheckCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 读卡 */
  ReadCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'ReadCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 弹卡 */
  EjectCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'EjectCard', params, options: { ...defaultOptions, ...options } });
  },
  /* 关闭读卡器 */
  CardClose(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'CardClose', params, options: { ...defaultOptions, ...options } });
  },
  /* 吞卡 */
  CardSwallow(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'CardSwallow', params, options: { ...defaultOptions, ...options } });
  },
  /* 开启密码键盘 */
  StartPin(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'StartPin', params, options: { ...defaultOptions, ...options } });
  },
  /* 获得键值 */
  GetOnePass(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'GetOnePass', params, options: { ...defaultOptions, ...options } });
  },
  /* 获取Pin密文 */
  GetPin(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'GetPin', params, options: { ...defaultOptions, ...options } });
  },
  /* 自助终端交易 */
  TransCard(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'TransCard', params, options: { ...defaultOptions, ...options } });
  },
})