import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.unified_payment_url

export default {
  /**
   * 更新订单状态（我方） PAY_Update_Trade_Status
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Update_His_Fail(params, options = {}) {
    return axios.post(baseUrl + 'PAY_Update_His_Fail', params, { options })
  },
  PAY_Update_His_Success(params, options = {}) {
    return axios.post(baseUrl + 'PAY_Update_His_Success', params, { options })
  },
  PAY_Update_His_Call(params, options = {}) {
    return axios.post(baseUrl + 'PAY_Update_His_Call', params, { options })
  },
  /**
   * 创建支付订单
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Create_Trade(params, options = {}) {
    return axios.post(baseUrl + 'PAY_Create_Trade', params, { options })
  },
  /**
   * 订单列表查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_QueryList(params, options = {}) {
    return axios.get(baseUrl + 'PAY_Trade_QueryList', { params, options })
  },
  /**
   * 订单查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Query(params, options = {}) {
    return axios.get(baseUrl + 'PAY_Trade_Query', { params, options })
  },
  /**
   * 处理HIS支付相关订单 PAY_Hospital_Trade
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Hospital_Trade(params, options = {}) {
    return axios.post(baseUrl + 'PAY_Hospital_Trade', params, { options })
  },
  /**
   * 支付宝刷脸支付 lc.trade.simle.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Simle_Pay(params, options = {}) {
    return axios.post(baseUrl + 'lc.trade.simle.pay', params, { options })
  },
  /**
   * 条码支付 lc.trade.barcode.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Barcode_Pay(params, options = {}) {
    return axios.post(baseUrl + 'lc.trade.barcode.pay', params, { options })
  },
  /**
   * 交易查询 lc.trade.query
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Query(params, options = {}) {
    return axios.get(baseUrl + 'lc.trade.query', { params, options })
  },
  /**
   * 交易撤销 lc.trade.cancel
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Cancel(params, options = {}) {
    return axios.post(baseUrl + 'lc.trade.cancel', params, { options })
  },
  /**
   * 聚合扫码支付 lc.trade.polymerization.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Polymerization_Pay(params, options = {}) {
    return axios.post(baseUrl + 'lc.trade.polymerization.pay', params, { options })
  },
  /**
   * 订单数据统计
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Statistic(params, options = {}) {
    return axios.get(baseUrl + 'PAY_Trade_Statistic', { params, options })
  }
}