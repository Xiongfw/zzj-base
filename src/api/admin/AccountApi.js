import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.ORG_CONFIG_URL + 'account/'

export default {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  login(params, options = {}) {
    return axios.post(baseUrl + 'login', params, { options: { ...options } })
  }
}