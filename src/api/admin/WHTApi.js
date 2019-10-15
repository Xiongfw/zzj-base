import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.org_config_url + 'wht/'

export default {
  /**
   * 获取硬件信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getInfoByWinConfigId(params, options = {}) {
    return axios.get(baseUrl + 'getInfoByWinConfigId', { params, options: { ...options, loading: false, log: false } })
  }
}