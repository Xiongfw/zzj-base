import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 7.1、确认就诊卡（含规则）
   */
  IF_Confirm_MedicalCard(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'IF_Confirm_MedicalCard', data, options });
  },
  /**
   * 7.2、充值就诊卡
   */
  IF_Charge_MedicalCard(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'IF_Charge_MedicalCard', data, options });
  },
  /**
   * 7.3、获取就诊卡充值列表
   */
  IF_Get_MedicalCard_Charge_List(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'IF_Get_MedicalCard_Charge_List', data, options });
  },
  /**
   * 7.4、获取就诊卡充值详细接口
   */
  IF_Get_MedicalCard_Charge_Detail(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'IF_Get_MedicalCard_Charge_Detail', data, options });
  },
  /**
   * 7.5、就诊卡退费
   */
  IF_Refund_MedicalCard(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'IF_Refund_MedicalCard', data, options });
  },
}