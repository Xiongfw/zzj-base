import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 1.1、创建就诊卡
   */
  IF_Create_MedicalCard(params, options = {}) {
    return axios.post(baseUrl + 'IF_Create_MedicalCard', params, { options })
  },
  /**
   * 1.2、登记就诊卡
   */
  IF_Regist_MedicalCard(params, options = {}) {
    return axios.post(baseUrl + 'IF_Regist_MedicalCard', params, { options })
  },
  /**
   * 1.3、注销就诊卡
   */
  IF_Cancel_MedicalCard(params, options = {}) {
    return axios.post(baseUrl + 'IF_Cancel_MedicalCard', params, { options })
  },
  /**
   * 1.4、清除就诊卡
   */
  IF_Clear_MedicalCard(params, options = {}) {
    return axios.get(baseUrl + 'IF_Clear_MedicalCard', { params, options })
  },
  /**
   * 1.5、获取医院已有卡列表
   */
  IF_Get_Hospital_MedicalCard_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Hospital_MedicalCard_List', { params, options })
  },
  /**
   * 1.8、刷新就诊卡
   */
  IF_Refresh_MedicalCard(params, options = {}) {
    return axios.get(baseUrl + 'IF_Refresh_MedicalCard', { params, options })
  },
  /**
   * 1.9、获取绑卡人信息
   */
  IF_Get_BindCardPerson_Info(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_BindCardPerson_Info', { params, options })
  },
}