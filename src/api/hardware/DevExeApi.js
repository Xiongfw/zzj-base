import axios from '../request'
import Constants from '@/constants/index'

const defaultOptions = { hardware: true }

export default {
  baseUrl: Constants.ext_device_url + 'exe/',
  /**
   * 打开软键盘
   */
  OpenOsk(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'OpenOsk', params, options: { ...defaultOptions, ...options } });
  },
  /**
   * 关闭软键盘
   */
  CloseOsk(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'CloseOsk', params, options: { ...defaultOptions, ...options } });
  },
}