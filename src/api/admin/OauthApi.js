import axios from '../request'
import { createHash } from 'crypto'
import localStore from '@/store/local'

const baseUrl = localStore.gateway + '/admin/oauth/'

export default {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  login(params, options = {}) {
    let md5 = createHash("md5")
    md5.update(params.password)
    let passwordMd5 = md5.digest("hex")
    params.password = passwordMd5
    params.grant_type = "password"
    params.client_id = "linkingzzj"
    params.client_secret = "lk.net.01"
    return axios({ method: 'post', url: baseUrl + 'token', params, options: { ...options } });
  }
}