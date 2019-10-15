import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.ext_device_url + 'print/'

const defaultOptions = { log: true, loading: false, alert: false }

export default {
  /* 打开打印设备串口 */
  OpenDevice(params, options = {}) {
    return axios.get(baseUrl + 'OpenDevice', { params, options: { ...defaultOptions, ...options } })
  },
  /* 关闭打印设备串口 */
  CloseDevice(params, options = {}) {
    return axios.get(baseUrl + 'CloseDevice', { params, options: { ...defaultOptions, ...options } })
  },
  /* 初始化打印机 */
  Init(params, options = {}) {
    return axios.get(baseUrl + 'Init', { params, options: { ...defaultOptions, ...options } })
  },
  /* 打印字符串 */
  PrintString(params, options = {}) {
    return axios.get(baseUrl + 'PrintString', { params, options: { ...defaultOptions, ...options } })
  },
  /* 切纸 */
  CutPaper(params, options = {}) {
    return axios.get(baseUrl + 'CutPaper', { params, options: { ...defaultOptions, ...options } })
  },
  /* 切纸 */
  SetLineSpace(params, options = {}) {
    return axios.get(baseUrl + 'SetLineSpace', { params, options: { ...defaultOptions, ...options } })
  },
  /* 获取设备状态 */
  GetDeviceStatus(params, options = {}) {
    return axios.get(baseUrl + 'GetDeviceStatus', { params, options: { ...defaultOptions, ...options } })
  },
  /* 设置左边距 */
  SetLeftSpace(params, options = {}) {
    return axios.get(baseUrl + 'SetLeftSpace', { params, options: { ...defaultOptions, ...options } })
  },
  /* 设置对齐方式 */
  SetAlign(params, options = {}) {
    return axios.get(baseUrl + 'SetAlign', { params, options: { ...defaultOptions, ...options } })
  },
  /* 设置英文字体 */
  SetPrintFontE(params, options = {}) {
    return axios.get(baseUrl + 'SetPrintFontE', { params, options: { ...defaultOptions, ...options } })
  },
  /* 微距进纸 */
  Feed(params, options = {}) {
    return axios.get(baseUrl + 'Feed', { params, options: { ...defaultOptions, ...options } })
  },
  /* 进纸iLines行 */
  FeedLines(params, options = {}) {
    return axios.get(baseUrl + 'FeedLines', { params, options: { ...defaultOptions, ...options } })
  },
  /* 打印指定内容条码 */
  PrintBarCode(params, options = {}) {
    return axios.get(baseUrl + 'PrintBarCode', { params, options: { ...defaultOptions, ...options } })
  },
  /* 打印指定内容二维码 */
  PrintQRCode(params, options = {}) {
    return axios.get(baseUrl + 'PrintQRCode', { params, options: { ...defaultOptions, ...options } })
  },
}