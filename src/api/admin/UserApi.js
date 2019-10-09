import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.ORG_CONFIG_URL + 'user/'

export default {
  /**
   * 获取硬件信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getCurrentUser(params, options = {}) {
    return axios.get(baseUrl + 'getCurrentUser', { params, options: { ...options } })
  }
}