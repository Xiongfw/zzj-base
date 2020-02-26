import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.logs_url + 'cloud/'
const defaultOptions = { log: false, loading: false, alert: false }

export default {
  /**
   * 手写识别
   */
  writingOCR(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'writingOCR', data, options: { ...defaultOptions, ...options } });
  }
}