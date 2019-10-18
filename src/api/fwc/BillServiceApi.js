import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 4.2 更新订单状态（院方） IF_Update_Trade_Status
   * 接口说明：
   * 先调服务窗4.2更新订单状态（院方） IF_Update_Trade_Status 再调贝尔曼统一支付平台更新订单状态（我方） PAY_Update_Trade_Status更新我方订单状态接口
   */
  IF_Update_Trade_Status(params, options = {}) {
    return axios.post(baseUrl + 'IF_Update_Trade_Status', params, { options })
  }
}