export function error(errMessage) {
  console.error('Logger: ' + errMessage)
}

export function support() {
  return !!(window.indexedDB && window.IDBTransaction && window.IDBKeyRange)
}
