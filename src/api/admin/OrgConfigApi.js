import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.org_config_url + 'org/'

export default {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getVersionById(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'getVersionById', params, options: { loading: false, log: false, alert: false, ...options } });
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getVersion(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'getVersion', params, options: { loading: false, log: false, alert: false, ...options } });
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgList(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'getOrgList', params, options: { log: false, ...options } });
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getWinCodeList(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'getWinCodeList', params, options: { log: false, ...options } });
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgWinconfigDetail(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'getOrgWinconfigDetail', params, options: { log: false, ...options } });
  }
}