import axios from '../request'
import DevBaseApi from './DevBaseApi'
import Constants from '@/constants/index'

const defaultOptions = { log: true, loading: false, alert: false, hardware: true }

export default Object.assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'idcard/',
  /* 读取身份证信息 */
  ReadIdCardInfo(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'ReadIdCardInfo', params, options: { ...defaultOptions, ...options } });
  },
})