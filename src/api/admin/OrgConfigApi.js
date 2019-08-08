import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.ORG_CONFIG_URL + 'org/'

export default {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getVersionById(params, options = {}) {
    return axios.get(baseUrl + 'getVersionById', { params, options: { ...options, loading: false, log: false } })
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getVersion(params, options = {}) {
    return axios.get(baseUrl + 'getVersion', { params, options: { ...options, loading: false, log: false } })
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgList(params, options = {}) {
    return axios.get(baseUrl + 'getOrgList', { params, options: { ...options, log: false } })
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getWinCodeList(params, options = {}) {
    return axios.get(baseUrl + 'getWinCodeList', { params, options: { ...options, log: false } })
  },
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgWinconfigDetail(params, options = {}) {
    return axios.get(baseUrl + 'getOrgWinconfigDetail', { params, options: { ...options, log: false } })
  }
}