import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 16.1、获取出院列表 IF_LeaveHospital_Get_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Get_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_LeaveHospital_Get_List', { params, options })
  },
  /**
   * 16.2、获取待办理出院详情 IF_LeaveHospital_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Detail(params, options = {}) {
    return axios.post(baseUrl + 'IF_LeaveHospital_Detail', params, { options })
  },
  /**
   * 16.3、确认出院办理 IF_LeaveHospital_Confirm
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Confirm(params, options = {}) {
    return axios.post(baseUrl + 'IF_LeaveHospital_Confirm', params, { options })
  },
  /**
   * 16.4、出院小结列表 IF_LeaveHospitalSummary_Get_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospitalSummary_Get_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_LeaveHospitalSummary_Get_List', { params, options })
  },
  /**
   * 16.5、出院小结详情 IF_LeaveHospitalSummary_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospitalSummary_Detail(params, options = {}) {
    return axios.post(baseUrl + 'IF_LeaveHospitalSummary_Detail', params, { options })
  },
  /**
   * 16.6、取消出院办理 IF_LeaveHospital_Cancel
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Cancel(params, options = {}) {
    return axios.post(baseUrl + 'IF_LeaveHospital_Cancel', params, { options })
  },
  /**
   * 16.7、确认出院-医保结算预约 IF_LeaveHospital_ByInsurance_Confirm
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_ByInsurance_Confirm(params, options = {}) {
    return axios.post(baseUrl + 'IF_LeaveHospital_ByInsurance_Confirm', params, { options })
  },
  /**
   * 16.8、获取已办理出院详情 IF_LeaveHospital_Result
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Result(params, options = {}) {
    return axios.post(baseUrl + 'IF_LeaveHospital_Result', params, { options })
  }
}