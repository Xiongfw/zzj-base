import axios from '../request'
import Constants from '@/constants/index'
import DevBaseApi from './DevBaseApi'

const defaultOptions = { log: true, loading: false, alert: false, hardware: true }

export default Object.assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'print/',
  /* 打印字符串 */
  PrintString(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'PrintString', data, options: { ...defaultOptions, ...options } });
  },
  /* 切纸 */
  CutPaper(params, options = {}) {
    return axios({ method: 'get', url: this.baseUrl + 'CutPaper', params, options: { ...defaultOptions, ...options } });
  },
  /* 设置行间距 */
  SetLineSpace(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetLineSpace', data, options: { ...defaultOptions, ...options } });
  },
  /* 获取设备状态 */
  GetDeviceStatus(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'GetDeviceStatus', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置左边距 */
  SetLeftSpace(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetLeftSpace', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置对齐方式 */
  SetAlign(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetAlign', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置英文字体 */
  SetPrintFontE(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetPrintFontE', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置中文字体 */
  SetPrintFontC(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'SetPrintFontC', data, options: { ...defaultOptions, ...options } });
  },
  /* 微距进纸 */
  Feed(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'Feed', data, options: { ...defaultOptions, ...options } });
  },
  /* 进纸iLines行 */
  FeedLines(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'FeedLines', data, options: { ...defaultOptions, ...options } });
  },
  /* 打印指定内容条码 */
  PrintBarCode(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'PrintBarCode', data, options: { ...defaultOptions, ...options } });
  },
  /* 打印指定内容二维码 */
  PrintQRCode(data, options = {}) {
    return axios({ method: 'post', url: this.baseUrl + 'PrintQRCode', data, options: { ...defaultOptions, ...options } });
  },
})