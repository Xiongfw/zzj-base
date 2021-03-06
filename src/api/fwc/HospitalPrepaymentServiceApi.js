import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 6.1、确认住院号（含规则）
   */
  IF_Confirm_AdmissionNumber(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'IF_Confirm_AdmissionNumber', data, options })
  },
  /**
   * 6.2、缴纳住院预缴金
   */
  IF_Charge_Foregift(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'IF_Charge_Foregift', data, options })
  },
  /**
   * 6.3、获取住院预缴列表
   */
  IF_Get_Inhospital_Foregift_List(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Inhospital_Foregift_List', params, options })
  },
  /**
   * 6.4、住院预交金详细接口
   */
  IF_Get_Inhospital_Foregift_Detail(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Inhospital_Foregift_Detail', params, options })
  },
  /**
   * 6.5、 获取住院患者列表
   */
  IF_Get_Inhospital_Patient_List(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Inhospital_Patient_List', params, options })
  },
  /**
   * 9.28、获取入院登记字段（自助机专用）
   */
  IF_Get_InhospitalCost_Field(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_InhospitalCost_Field', params, options })
  }
}