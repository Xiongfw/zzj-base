import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 99.20、代扣协议查询 FWC_IF_Withholding_Query
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  FWC_IF_Withholding_Query(params, options = {}) {
    return axios.post(baseUrl + 'FWC_IF_Withholding_Query', params, { options })
  },
  /**
   * 99.21、扫码绑定卡号
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_FWC_BindCardNoByQrCode(params, options = {}) {
    return axios.post(baseUrl + 'IF_FWC_BindCardNoByQrCode', params, { options })
  },
  /**
   * 99.27、自助绑卡 FWC_IF_BindCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  FWC_IF_BindCard(params, options = {}) {
    return axios.post(baseUrl + 'FWC_IF_BindCard', params, { options })
  },
  /**
   * 99.33、刷脸支付芝麻授权初始化 IF_FacePay_ZhiMaInit
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_FacePay_ZhiMaInit(params, options = {}) {
    return axios.get(baseUrl + 'IF_FacePay_ZhiMaInit', { params, options })
  },
  /**
   * 99.34、刷脸支付 FWC_IF_Face_Pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  FWC_IF_Face_Pay(params, options = {}) {
    return axios.post(baseUrl + 'FWC_IF_Face_Pay', params, { options })
  },
  /**
   * 99.35、刷脸生活芝麻授权初始化 IF_FaceLive_ZhiMaInit
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_FaceLive_ZhiMaInit(params, options = {}) {
    return axios.get(baseUrl + 'IF_FaceLive_ZhiMaInit', { params, options })
  },
}