import * as db from './src/indexeddb'
import { fields } from './src/config'
import dayjs from 'dayjs'
import _ from 'lodash'

function info(data = fields(), callback) {
  add('info', data, callback)
}

function warn(data = fields(), callback) {
  add('warn', data, callback)
}

function error(data = fields(), callback) {
  add('error', data, callback)
}

function add(level, data = fields(), callback) {
  let log = fields()
  if (_.isString(data)) {
    log.desc = data
  }
  const timestamp = dayjs().valueOf()
  log.create_time = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss:SSS')
  log.timestamp = timestamp
  log.level = level
  log = _.isPlainObject(data) ? _.defaults(data, log) : log
  db.add(log, callback)
}

/**
 * 获取全部日志
 * @param {function} callback 回调函数
 * @param {IDBKeyRange|string|number} query 查询条件
 * @param {number} count 查询条数
 * @param {Boolean} isDelete 查询后是否删除
 */
function getAll(callback, query, count, isDelete) {
  db.getAll(callback, query, count, isDelete)
}

/**
 * 根据索引查询
 * @param {function} callback 回调函数
 * @param {string} indexName 索引名
 * @param {IDBKeyRange|string|number} query 查询条件
 * @param {number} count 查询条数
 */
function getAllByIndex(callback, indexName, query, count) {
  db.getAllByIndex(callback, indexName, query, count)
}

/**
 * 根据时间查询 举个栗子--查看1小时内的日志getAllByTime(1, 'h')
 * @param {function} callback 回调函数
 * @param {number} value 时间值
 * @param {string} unit 时间单位："millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "d" | "M" | "y" | "h" | "m" | "s" | "ms" | "week" | "w"
 */
function getAllByTime(callback, value, unit) {
  const currentTime = dayjs().valueOf()
  const startTime = dayjs(currentTime).subtract(value, unit).valueOf()
  getAllByIndex(callback, 'timestamp', IDBKeyRange.bound(startTime, currentTime))
}

/**
 * 
 * @param {function} callback 回调函数
 * @param {string} indexName 索引名
 * @param {IDBKeyRange|string|number} query 查询条件
 */
function deleteAllByIndex(callback, indexName, query) {
  db.deleteAllByIndex(callback, indexName, query)
}

/**
 * 根据时间删除日志 举个栗子--删除1小时内的日志deleteAllByTime(1, 'h')
 * @param {function} callback 回调函数
 * @param {number} value 时间值
 * @param {string} unit 时间单位："millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "d" | "M" | "y" | "h" | "m" | "s" | "ms" | "week" | "w"
 */
function deleteAllByTime(callback, value, unit) {
  const currentTime = dayjs().valueOf()
  const startTime = dayjs(currentTime).subtract(value, unit).valueOf()
  deleteAllByIndex(callback, 'timestamp', IDBKeyRange.bound(startTime, currentTime))
}

/**
 * 删除一条或者多条
 * @param {Array|String} key 主键
 */
function remove(keys) {
  const tasks = []
  const promiseify = function (id) {
    return new Promise(resolve => {
      db.remove(id, res => { resolve(res) })
    })
  }
  if (Array.isArray(keys)) {
    keys.forEach(item => {
      tasks.push(promiseify(item.id))
    })
  } else {
    tasks.push(promiseify(keys.id))
  }
  return Promise.all(tasks)
}

/**
 * 删除日志并返回
 * @param {function} callback 回调函数
 * @param {Number} count 删除条数
 */
function pop(callback, count) {
  getAll(callback, null, count, true)
}

/**
 * 清空全部日志
 * @param {function} callback 回调函数
 */
function clear(callback) {
  db.clear(callback)
}

export {
  info,
  warn,
  error,
  clear,
  remove,
  pop,
  getAll,
  getAllByIndex,
  getAllByTime,
  deleteAllByIndex,
  deleteAllByTime
}

