import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 25.1、门诊排班科室列表 IF_Get_Scheduling_Outpatient
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Scheduling_Outpatient(params, options = {}) {
    return axios.post(baseUrl + 'IF_Get_Scheduling_Outpatient', params, { options })
  },
  /**
   * 25.2、门诊排班详情 IF_Get_Scheduling_Outpatient_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Scheduling_Outpatient_Detail(params, options = {}) {
    return axios.post(baseUrl + 'IF_Get_Scheduling_Outpatient_Detail', params, { options })
  },
  /**
   * 25.3、获取医生排班  IF_Get_Doc_Scheduling_Outpatient_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Doc_Scheduling_Outpatient_Detail(params, options = {}) {
    return axios.post(baseUrl + 'IF_Get_Doc_Scheduling_Outpatient_Detail', params, { options })
  },
  /**
   * 25.4、停诊排班 IF_Get_Scheduling_Close
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Scheduling_Close(params, options = {}) {
    return axios.post(baseUrl + 'IF_Get_Scheduling_Close', params, { options })
  }
}