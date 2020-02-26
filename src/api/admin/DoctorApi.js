import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.org_config_url + 'doctor/'

export default {
  /**
   * 根据机构id获取医院信息和科室列表
   */
  getDoctorList(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'getDoctorList', params, options });
  }
}