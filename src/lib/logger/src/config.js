import localStore from '@/store/local.js'
import globalConfig from '@/globalConfig.js'

function f(arr) {
  try {
    return arr.reduce((p, item) => {
      return p[item]
    }, globalConfig.store.state)
  } catch (e) {
    return null
  }
}

// 对象仓库名
export const object_store_name = 'logs'
// 数据库名
export const database_name = 'berm'
// 数据库版本
export const database_version = 2
// 日志字段
export const fields = () => {
  return {
    // 创建时间
    create_time: null,
    // 时间戳
    timestamp: null,
    // 日志等级 info, warn, error
    level: 'info',
    // 日志描述
    desc: null,
    // 日志类型 normal: 普通交互日志 api: 接口API日志
    type: 'normal',
    // 接口url
    url: null,
    // 接口入参
    in_param: null,
    // 接口出参
    out_param: null,
    // 操作人ID
    oper_id: f(globalConfig.logger.oper_id),
    // 操作人姓名
    oper_name: f(globalConfig.logger.oper_name),
    // 机构ID
    org_id: localStore.orgId,
    // 机器ID
    win_config_id: localStore.winConfigId,
    // 扩展数据
    data: null
  }
}