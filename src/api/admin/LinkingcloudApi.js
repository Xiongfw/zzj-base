import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.org_config_url + 'linkingcloud/'

export default {
  /**
   *  根据机构id获取医院信息和科室列表
   */
  Get_Hosp_Info_Speciality_List(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'Get_Hosp_Info_Speciality_List', data, options });
  },
  /**
   *  获取科室介绍和医生列表，医生介绍
   */
  Get_Speciality_Info_Doctor_List(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'Get_Speciality_Info_Doctor_List', data, options });
  },
}