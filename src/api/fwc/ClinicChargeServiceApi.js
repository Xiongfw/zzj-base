import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 5.1、获取诊间未缴费账单列表
   */
  IF_Get_OutPatient_Uncharge_Trade_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_OutPatient_Uncharge_Trade_List', { params, options })
  },
  /**
   * 5.2、获取未付诊间缴费明细
   */
  IF_Get_OutPatient_UnCharge_Trade_Detail(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_OutPatient_UnCharge_Trade_Detail', { params, options })
  },
  /**
   * 5.4、获取诊间费用详细
   */
  IF_Get_OutPatient_Charged_Trade_Detail(params, options = {}) {
    return axios.post(baseUrl + 'IF_Get_OutPatient_Charged_Trade_Detail', params, { options })
  },
  /**
   * 5.5、诊间未缴费订单验证接口（院方）--
   * 接口说明：
   * 先调服务窗 5.5、诊间未缴费订单验证接口（院方） IF_Check_Hospital_Trade
   * 根据 CheckUnchargedTrade 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   */
  IF_Check_Hospital_Trade(params, options = {}) {
    return axios.post(baseUrl + 'IF_Check_Hospital_Trade', params, { options })
  }
}