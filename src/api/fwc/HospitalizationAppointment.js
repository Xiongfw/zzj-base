import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 14.1、获取住院列表 IF_Hospitalization_Get_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Get_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Hospitalization_Get_List', { params, options })
  },
  /**
   * 14.2、获取已登记住院信息 IF_Hospitalization_Get_Registration_Info
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Get_Registration_Info(params, options = {}) {
    return axios.post(baseUrl + 'IF_Hospitalization_Get_Registration_Info', params, { options })
  },
  /**
   * 14.3、住院信息登记 IF_Hospitalization_Registration_Info
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Registration_Info(params, options = {}) {
    return axios.post(baseUrl + 'IF_Hospitalization_Registration_Info', params, { options })
  },
  /**
   * 14.4、获取住院详情 IF_Hospitalization_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Detail(params, options = {}) {
    return axios.post(baseUrl + 'IF_Hospitalization_Detail', params, { options })
  },
  /**
   * 14.5、确认预约 IF_Hospitalization_Confirm_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Confirm_Booking(params, options = {}) {
    return axios.post(baseUrl + 'IF_Hospitalization_Confirm_Booking', params, { options })
  },
  /**
   * 14.6、取消住院 IF_Hospitalization_Cancel_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Cancel_Booking(params, options = {}) {
    return axios.post(baseUrl + 'IF_Hospitalization_Cancel_Booking', params, { options })
  }
}