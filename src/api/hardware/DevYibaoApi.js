import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.ext_device_url + 'yibao/'

export default {
  /* 保障卡基本信息读取 */
  ReadBaseInfo(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'ReadBaseInfo', params, options });
  },
  /* 保障卡卡号读取 */
  ReadCardNo(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'ReadCardNo', params, options });
  },
}