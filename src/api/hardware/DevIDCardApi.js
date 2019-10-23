import axios from '../request'
import DevBaseApi from './DevBaseApi'
import Constants from '@/constants/index'

const baseUrl = Constants.ext_device_url + 'idcard/'

const defaultOptions = { log: false, loading: false, alert: false }

export default Object.assign({}, DevBaseApi, {
  /* 读取身份证信息 */
  ReadIdCardInfo(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'ReadIdCardInfo', params, options: { ...defaultOptions, ...options } });
  },
})