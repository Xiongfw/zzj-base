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