import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 9.1、获取住院总费用列表
   */
  IF_Get_Inhospital_Total_Cost_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Inhospital_Total_Cost_List', { params, options })
  },
  /**
   * 9.2、获取住院总费用详细
   */
  IF_Get_Inhospital_Total_Cost_Detail(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Inhospital_Total_Cost_Detail', { params, options })
  },
  /**
   * 9.5、获取住院患者列表
   */
  IF_Get_InhospitalCost_Patient_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_InhospitalCost_Patient_List', { params, options })
  },
  /**
   * 9.6、获取住院详情
   * 腕带和就诊卡登录都是调用此接口：腕带登录PatientNumber字段传住院号；就诊卡登录PatientNumber字段传卡号；另外再加biz_type过去非必填字段，主要用于区分是就诊卡还是腕带
   */
  IF_Get_InhospitalCost_Patient_Detail(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_InhospitalCost_Patient_Detail', { params, options })
  },
  /**
   * 9.7、获取住院记录
   */
  IF_Get_Inhospital_info_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Inhospital_info_List', { params, options })
  },
}