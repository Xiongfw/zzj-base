import { error, support } from './utils'
import * as config from './config'
import _ from 'lodash'

// 数据库
var db = null

/** 初始化数据库 */
function init(callback) {
  if (!support) {
    return error('该环境不支持IndexedDB')
  }
  try {
    const request = window.indexedDB.open(config.database_name, config.database_version)
    request.onerror = e => error('打开数据库失败')
    request.onsuccess = e => {
      _.isFunction(callback) && callback(e.target.result)
    }
    request.onupgradeneeded = e => {
      const db = e.target.result
      if (db.objectStoreNames.contains(config.object_store_name)) {
        db.deleteObjectStore(config.object_store_name)
      }
      const objectStore = db.createObjectStore(config.object_store_name, { autoIncrement: true })
      Object.keys(config.fields()).forEach(key => {
        objectStore.createIndex(key, key, { unique: false })
      })
    }
  } catch (e) {
    error('数据库初始化失败-' + e.message)
  }
}

/** 根据索引删除*/
function deleteAllByIndex(callback, indexName, query) {
  getObjectStore(store => {
    if (!indexName || !store.indexNames.contains(indexName)) {
      throw new Error('索引不能为空或不存在')
    }
    const index = store.index(indexName)
    const request = index.openCursor(query)
    request.onsuccess = event => {
      const cursor = event.target.result
      if (cursor) {
        cursor.delete()
        cursor.continue()
      } else {
        _.isFunction(callback) && callback(true, null)
      }
    }
    request.onerror = event => {
      _.isFunction(callback) && callback(null, event)
      error('delete failed')
    }
  })
}

/** 获取对象仓库 */
function getObjectStore(callback) {
  if (!db) {
    init(res => {
      db = res
      getObjectStore(callback)
    })
  } else {
    const transaction = db.transaction(config.object_store_name, 'readwrite')
    const objectStore = transaction.objectStore(config.object_store_name)
    _.isFunction(callback) && callback(objectStore)
  }
}

/** 根据索引查询 */
function getAllByIndex(callback, indexName, query, count) {
  getObjectStore(store => {
    if (!indexName || !store.indexNames.contains(indexName)) {
      throw new Error('索引不能为空或不存在')
    }
    const index = store.index(indexName)
    const request = index.getAll(query, count)
    request.onsuccess = event => {
      _.isFunction(callback) && callback(event.target.result, null)
    }
    request.onerror = event => {
      _.isFunction(callback) && callback(null, event)
      error('index query failed')
    }
  })
}

/** 获取全部日志 */
function getAll(callback, query, count) {
  getObjectStore(store => {
    const request = store.getAll(query, count)
    request.onsuccess = event => {
      _.isFunction(callback) && callback(event.target.result, null)
    }
    request.onerror = event => {
      _.isFunction(callback) && callback(null, event)
      error('getAll failed')
    }
  })
}

/** 增 */
function add(data, callback) {
  getObjectStore(store => {
    const request = store.add(data)
    request.onsuccess = event => {
      _.isFunction(callback) && callback(event.target.result, null)
    }
    request.onerror = event => {
      _.isFunction(callback) && callback(null, event)
      error('insert failed')
    }
  })
}

/** 删 */
function remove(key, callback) {
  getObjectStore(store => {
    const request = store.delete(key)
    request.onsuccess = event => {
      _.isFunction(callback) && callback(event.target.result, null)
    }
    request.onerror = event => {
      _.isFunction(callback) && callback(null, event)
      error('delete failed')
    }
  })
}

/** 改 */
function update(data, callback) {
  getObjectStore(store => {
    const request = store.put(data)
    request.onsuccess = event => {
      _.isFunction(callback) && callback(event.target.result, null)
    }
    request.onerror = event => {
      _.isFunction(callback) && callback(null, event)
      error('update failed')
    }
  })
}
/** 清空数据库 */
function clear(callback) {
  getObjectStore(store => {
    const request = store.clear()
    request.onsuccess = event => {
      _.isFunction(callback) && callback(event.target.result, null)
    }
    request.onerror = event => {
      _.isFunction(callback) && callback(null, event)
      error('clear failed')
    }
  })
}

export {
  add,
  remove,
  update,
  clear,
  getAll,
  getAllByIndex,
  deleteAllByIndex
}