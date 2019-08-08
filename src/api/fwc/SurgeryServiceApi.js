import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 41.1、获取手术相关信息 IF_Surgery_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Surgery_Detail(params, options = {}) {
    return axios.post(baseUrl + 'IF_Surgery_Detail', params, { options })
  }
}