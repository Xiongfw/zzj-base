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
 */
function getAll(callback, query, count) {
  db.getAll(...arguments)
}

/**
 * 根据索引查询
 * @param {function} callback 回调函数
 * @param {string} indexName 索引名
 * @param {IDBKeyRange|string|number} query 查询条件
 * @param {number} count 查询条数
 */
function getAllByIndex(callback, indexName, query, count) {
  db.getAllByIndex(...arguments)
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
  db.deleteAllByIndex(...arguments)
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
  getAll,
  getAllByIndex,
  getAllByTime,
  deleteAllByIndex,
  deleteAllByTime
}

