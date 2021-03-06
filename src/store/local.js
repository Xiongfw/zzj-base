import _ from 'lodash'

const store = {
  // 硬件信息
  hardware: null,
  // 医院信息
  hospital: null,
  // 版本
  version: null,
  // 机构ID
  orgId: null,
  deptId: null,
  // 机器ID
  winConfigId: null,
  winCode: null,
  // 网关默认地址
  gateway: null,
  // 统一支付平台地址
  payUrl: null,
  // 服务窗地址
  fwcUrl: null,
  // 硬件服务地址
  devUrl: null,
  // 医保服务地址
  yibaoUrl: null,
  // 管理后台地址
  adminUrl: null,
  username: null,
  password: null,
  // token
  authorization: null,
  // 10.11、获取提醒字典 IF_FWC_Tip_Dictionary
  tipDicts: null,
  // 10.15、获取医院配置 IF_Get_Inhospital_ConfigList
  fwcHospConfig: null
}

Object.keys(store).forEach(key => {
  Object.defineProperty(store, key, {
    get() {
      const value = localStorage.getItem(key)
      if (!value) return ''
      try {
        const valueJson = JSON.parse(value)
        if (_.isObject(valueJson)) return valueJson
        return value
      } catch (e) {
        return value
      }
    },
    set(value) {
      if (_.isNull(value) || _.isUndefined(value)) {
        localStorage.removeItem(key)
      }
      else if (_.isObject(value)) {
        localStorage.setItem(key, JSON.stringify(value))
      } else {
        localStorage.setItem(key, value)
      }
    }
  })
})

export default store