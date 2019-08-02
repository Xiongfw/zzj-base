import globalConfig from '@/globalConfig.js'
import localStore from './local.js'
import _ from 'lodash'

export default {
  state: {
    // 是否自动退出
    isAutoLeave: true,
    // 当前倒计时时间
    nowTimeout: 0,
    // 当前医院
    hospital: localStore.hospital || null,
  },
  mutations: {
    setHospital(state, v) {
      v.treeNodeList = v.treeNodeList.filter(item => item.selected)
      state.hospital = v
      localStore.hospital = state.hospital
      localStore.orgId = state.hospital.id
      localStore.winConfigId = state.hospital.winConfig.winConfigInfo.win_config_id
    },
    setNowTimeout(state, v) {
      _.isUndefined(v) ? state.nowTimeout-- : state.nowTimeout = v
    },
    isAutoLeave(state, v) {
      if (state.hospital && v) {
        state.nowTimeout = state.hospital.exit_timeout
      }
      state.isAutoLeave = v
      globalConfig.el.click()
    }
  },
  actions: {},
  getters: {
    getOrgId(state) {
      if (state.hospital) {
        return state.hospital.id
      }
    },
    getWinConfigId(state) {
      if (state.hospital) {
        return state.hospital.winConfig.winConfigInfo.win_config_id
      }
    }
  }
}