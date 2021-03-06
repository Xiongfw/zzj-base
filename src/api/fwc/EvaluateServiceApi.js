import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url

export default {
  /**
   * 26.5、获取评价选项
   */
  IF_Get_EvaluateOption_Info(params, options = {}) {
    return axios.post(baseUrl + 'IF_Get_EvaluateOption_Info', params, { options })
  },
  /**
   * 26.6、保存评价
   */
  IF_Evaluate_Save(params, options = {}) {
    return axios.post(baseUrl + 'IF_Evaluate_Save', params, { options })
  },
}