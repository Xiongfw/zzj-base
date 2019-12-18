import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 31.99、价格公示列表
   */
  IF_Get_PricePublicity_List(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'IF_Get_PricePublicity_List', params, options });
  }
}