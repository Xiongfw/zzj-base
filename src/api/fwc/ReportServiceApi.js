import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 8.2、获取检验报告详细
   */
  IF_Get_Jianyan_Report_Detail(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Jianyan_Report_Detail', params, options });
  },
  /**
   * 8.4、获取放射报告详细
   */
  IF_Get_Fangshe_Report_Detail(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Fangshe_Report_Detail', params, options });
  },
  /**
   * 8.6、获取超声报告详细
   */
  IF_Get_Chaosheng_Report_Detail(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Chaosheng_Report_Detail', params, options });
  },
  /**
   * 8.8、获取病理报告详细
   */
  IF_Get_Bingli_Report_Detail(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Bingli_Report_Detail', params, options });
  },
  /**
   * 8.10、获取体检报告详情
   */
  IF_Get_TiJian_Report_Detail(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_TiJian_Report_Detail', params, options });
  },
  /**
   * 8.11、获取报告列表
   */
  IF_Get_Report_List(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_Report_List', params, options });
  },
  /**
   * 8.12、获取报告人列表
   */
  IF_GetReportPerson_List(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_GetReportPerson_List', params, options });
  },
  /**
   * 8.13、验证手机号
   */
  IF_Tel_verify(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Tel_verify', params, options });
  },
}