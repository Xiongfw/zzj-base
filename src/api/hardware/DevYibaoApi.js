import axios from '../request'
import Constants from '@/constants/index'

const defaultOptions = { log: false, loading: false, alert: false, hardware: true }

export default {
  baseUrl: Constants.yibao_url + 'yibao/',
  /* 保障卡基本信息读取 */
  ReadBaseInfo(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'ReadBaseInfo', params, options: { ...defaultOptions, ...options } });
  },
  /* 保障卡卡号读取 */
  ReadCardNo(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'ReadCardNo', params, options: { ...defaultOptions, ...options } });
  },
}