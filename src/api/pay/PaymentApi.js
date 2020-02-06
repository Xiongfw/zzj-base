import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.unified_payment_url

export default {
  /**
   * 扫码支付（云闪付）
   */
  lc_trade_qrcode_pay(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'lc.trade.qrcode.pay', data, options });
  },
  /**
   * 聚合扫码支付获取二维码
   */
  phonePayGetQRCode(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'lc.trade.polymerization.pay', data, options });
  },
  /**
   * 交易查询
   */
  getPayStatus(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'lc.trade.query', params, options });
  },
  /**
   * 交易撤销
   */
  cancelTrade(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'lc.trade.cancel', data, options });
  },
  /**
   * 在本地创建订单
   */
  PAY_Create_Trade(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'pay/PAY_Create_Trade', data, options });
  },
  /**
   * 处理HIS支付订单
   */
  PAY_Hospital_Trade(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'PAY_Hospital_Trade', data, options });
  },
  /**
   * 更新本地订单状态
   */
  PAY_Update_Trade_Status(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'pay/PAY_Update_Trade_Status', data, options });
  },
  /**
   * 更新我方订单状态为His_Fail
   */
  PAY_Update_His_Fail(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'pay/PAY_Update_His_Fail', data, options });
  },
  /**
   * 更新我方订单状态为His_Success
   */
  PAY_Update_His_Success(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'PAY_Update_His_Success', data, options });
  },
  /**
   * 更新我方订单状态为His_Call
   */
  PAY_Update_His_Call(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'pay/PAY_Update_His_Call', data, options });
  }
}