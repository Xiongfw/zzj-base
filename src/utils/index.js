import localStore from "../store/local.js"

export * from './idCard.js'
export { default as masking } from '@/filters/masking.js'

/** 刷新 */
export function refresh() {
  if (window.nativeMethod) {
    window.nativeMethod.refresh()
  } else {
    window.location.reload(true)
  }
}

/** 生成guid */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function buildOpenUserID() {
  if (localStore.hospital) {
    let openCode = localStore.hospital.hosp_code + '_' + localStore.hospital.org_code + '_' + localStore.hospital.winConfig.win_code
    if (openCode) {
      return openCode
    }
  }
}

export function toArray(list) {
  if (Array.isArray(list)) return list;
  return list ? [list] : []
}

export function isEmpty(value) {
  if (!value) return true;
  if (Array.isArray(value) && value.length == 0) return true;
  if (typeof value === 'object' && Object.keys(value).length == 0) return true;
  return false;
}