import axios from '../request'
import Constants from '@/constants/index'
import DevBaseApi from './DevBaseApi'

const baseUrl = Constants.ext_device_url + 'print/'

const defaultOptions = { log: false, loading: false, alert: false }

export default Object.assign({}, DevBaseApi, {
  /* 打印字符串 */
  PrintString(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'PrintString', data, options: { ...defaultOptions, ...options } });
  },
  /* 切纸 */
  CutPaper(params, options = {}) {
    return axios({ method: 'get', url: baseUrl + 'CutPaper', params, options: { ...defaultOptions, ...options } });
  },
  /* 设置行间距 */
  SetLineSpace(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetLineSpace', data, options: { ...defaultOptions, ...options } });
  },
  /* 获取设备状态 */
  GetDeviceStatus(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'GetDeviceStatus', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置左边距 */
  SetLeftSpace(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetLeftSpace', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置对齐方式 */
  SetAlign(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetAlign', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置英文字体 */
  SetPrintFontE(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetPrintFontE', data, options: { ...defaultOptions, ...options } });
  },
  /* 设置中文字体 */
  SetPrintFontC(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'SetPrintFontC', data, options: { ...defaultOptions, ...options } });
  },
  /* 微距进纸 */
  Feed(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'Feed', data, options: { ...defaultOptions, ...options } });
  },
  /* 进纸iLines行 */
  FeedLines(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'FeedLines', data, options: { ...defaultOptions, ...options } });
  },
  /* 打印指定内容条码 */
  PrintBarCode(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'PrintBarCode', data, options: { ...defaultOptions, ...options } });
  },
  /* 打印指定内容二维码 */
  PrintQRCode(data, options = {}) {
    return axios({ method: 'post', url: baseUrl + 'PrintQRCode', data, options: { ...defaultOptions, ...options } });
  },
})