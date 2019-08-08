import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 12.6、自助机登录二维码获取 IF_Get_ZiZhuJi_LoginUrl
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_ZiZhuJi_LoginUrl(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_ZiZhuJi_LoginUrl', { params, options })
  },
  /**
   * 12.8、获取已绑卡列表 IF_Get_BindCard_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_BindCard_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_BindCard_List', { params, options })
  }
}