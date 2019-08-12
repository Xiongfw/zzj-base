export function isFunc(fn) {
  return typeof fn === 'function'
}

export function refresh() {
  if (window.nativeMethod) {
    window.nativeMethod.refresh()
  } else {
    window.location.reload(true)
  }
}