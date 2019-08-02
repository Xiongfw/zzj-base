import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.Service_Window_URL

export default {
  /**
   * 26.5、获取评价选项 IF_Get_EvaluateOption_Info
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_EvaluateOption_Info(params, options = {}) {
    return axios.post(baseUrl + 'IF_Get_EvaluateOption_Info', params, { options })
  },
  /**
   * 26.6、保存评价 IF_Evaluate_Save
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Evaluate_Save(params, options = {}) {
    return axios.post(baseUrl + 'IF_Evaluate_Save', params, { options })
  },
}