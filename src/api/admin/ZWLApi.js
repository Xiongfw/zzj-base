import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.ORG_CONFIG_URL + 'zwl/'

export default {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  receiveLogs(params, options = {}) {
    return axios.post(baseUrl + 'receiveLogs', params, { options: { ...options, log: false, loading: false, alert: false } })
  }
}