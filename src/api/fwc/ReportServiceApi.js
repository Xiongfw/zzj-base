import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 8.1、获取检验报告列表 IF_Get_Jianyan_Report_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Jianyan_Report_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Jianyan_Report_List', { params, options })
  },
  /**
   * 8.2、获取检验报告详细 IF_Get_Jianyan_Report_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Jianyan_Report_Detail(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Jianyan_Report_Detail', { params, options })
  },
  /**
   * 8.3、获取放射报告列表 IF_Get_Fangshe_Report_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Fangshe_Report_List(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Fangshe_Report_List', { params, options })
  },
  /**
   * 8.4、获取放射报告详细 IF_Get_Fangshe_Report_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Fangshe_Report_Detail(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Fangshe_Report_Detail', { params, options })
  },
}