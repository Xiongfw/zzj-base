import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.unified_payment_url

export default {
  /**
   * 根据open_user_id查询授权表的用户信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo(params, options = {}) {
    return axios.post(baseUrl + 'PAY_AuthorizeInfo', params, { options })
  },
  /**
   * 登录授权回调
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_System_Oauth_Userinfo(params, options = {}) {
    return axios.get(baseUrl + 'lc.system.oauth.userinfo', { params, options })
  },
  /**
   * 根据ftoken获取联空返回的openUserID
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Alipay_Customer_Ftoken_Query(params, options = {}) {
    return axios.get(baseUrl + 'lc.alipay.customer.ftoken.query', { params, options })
  },
  /**
   * 统计授权数据
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo_Statistic(params, options = {}) {
    return axios.get(baseUrl + 'PAY_AuthorizeInfo_Statistic', { params, options })
  },
}