import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 23.1、获取挂号资源
   */
  IF_Get_Regist_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Regist_Resource', { params, options: { log: false, ...options } })
  },
  /**
   * 23.1、获取挂号资源
   */
  IF_Get_Regist_Resource_DataSource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Regist_Resource_DataSource', { params, options: { log: false, ...options } })
  },
  /**
   * 23.3、获取医生挂号号源
   */
  IF_Get_Regist_Doc_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Regist_Doc_Resource', { params, options: { log: false, ...options } })
  },
  /**
   * 23.6、确认挂号
   * 先调服务窗 23.6、确认挂号 IF_Confirm_Regist
   * 根据 HospitalTradeApplyInfo 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   */
  IF_Confirm_Regist(params, options = {}) {
    return axios.post(baseUrl + 'IF_Confirm_Regist', params, { options })
  },
  /**
   * 23.7、取消挂号
   */
  IF_Cancel_Regist(params, options = {}) {
    return axios.post(baseUrl + 'IF_Cancel_Regist', params, { options })
  },
  /**
   * 23.8、获取患者挂号列表
   */
  IF_Get_Patient_Regist_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Patient_Regist_List', { params, options })
  },
  /**
   * 23.9、获取患者挂号详细
   */
  IF_Get_Patient_Regist_Detail(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Patient_Regist_Detail', { params, options })
  }
}