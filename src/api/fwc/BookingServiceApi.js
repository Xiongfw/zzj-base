import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 22.1、获取预约资源 IF_Get_Booking_Resource
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Booking_Resource', { params, options })
  },
  /**
   * 22.2、获取科室预约号源 IF_Get_Booking_Dept_NoSource
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Dept_NoSource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Booking_Dept_NoSource', { params, options })
  },
  /**
   * 22.3、获取医生预约号源 IF_Get_Booking_Doc_Resource
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Doc_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Booking_Doc_Resource', { params, options })
  },
  /**
   * 22.6、确认预约 IF_Confirm_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Confirm_Booking(params, options = {}) {
    return axios.post(baseUrl + 'IF_Confirm_Booking', params, { options })
  },
  /**
   * 22.7、取消预约 IF_Cancel_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Cancel_Booking(params, options = {}) {
    return axios.get(baseUrl + 'IF_Cancel_Booking', { params, options })
  },
  /**
   * 22.8、预约转挂号 IF_Booking_To_Regist
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Booking_To_Regist(params, options = {}) {
    return axios.post(baseUrl + 'IF_Booking_To_Regist', params, { options })
  },
  /**
   * 22.9、获取患者预约列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Patient_Booking_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Patient_Booking_List', { params, options })
  },
  /**
   * 22.10、获取患者预约详细
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Patient_Booking_Detail(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Patient_Booking_Detail', { params, options })
  },
  /**
   * 22.12、确认签到 IF_Confirm_Check
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Confirm_Check(params, options = {}) {
    return axios.post(baseUrl + 'IF_Confirm_Check', params, { options })
  },
}