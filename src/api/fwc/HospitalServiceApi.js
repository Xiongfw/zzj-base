import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 10.2、获取医院候诊查询列表（个人）
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Hospital_Waiting_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Hospital_Waiting_List', { params, options })
  },
  /**
   * 10.11、获取提醒字典 IF_FWC_Tip_Dictionary
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_FWC_Tip_Dictionary(params, options = {}) {
    return axios.get(baseUrl + 'IF_FWC_Tip_Dictionary', { params, options })
  }
}