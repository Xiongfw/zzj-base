import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 1.1、创建就诊卡  IF_Create_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Create_MedicalCard(params, options = {}) {
    return axios.post(baseUrl + 'IF_Create_MedicalCard', params, { options })
  },
  /**
   * 1.2、登记就诊卡  IF_Regist_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Regist_MedicalCard(params, options = {}) {
    return axios.post(baseUrl + 'IF_Regist_MedicalCard', params, { options })
  },
  /**
   * 1.3、注销就诊卡 IF_Cancel_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Cancel_MedicalCard(params, options = {}) {
    return axios.post(baseUrl + 'IF_Cancel_MedicalCard', params, { options })
  },
  /**
   * 1.4、清除就诊卡 IF_Clear_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Clear_MedicalCard(params, options = {}) {
    return axios.get(baseUrl + 'IF_Clear_MedicalCard', { params, options })
  },
  /**
   * 1.5、获取医院已有卡列表 IF_Get_Hospital_MedicalCard_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Hospital_MedicalCard_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Hospital_MedicalCard_List', { params, options })
  },
  /**
   * 1.8、刷新就诊卡 IF_Refresh_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Refresh_MedicalCard(params, options = {}) {
    return axios.get(baseUrl + 'IF_Refresh_MedicalCard', { params, options })
  },
}