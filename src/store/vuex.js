import globalConfig from '@/globalConfig.js'
import localStore from './local.js'
import _ from 'lodash'

const autoLeaveQueue = []

export default {
  state: {
    // 硬件信息
    hardware: localStore.hardware || null,
    // 是否自动退出
    isAutoLeave: true,
    // 是否全屏
    isFullscreen: false,
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
      localStore.winCode = state.hospital.winConfig.win_code
    },
    setHardWare(state, v) {
      state.hardware = v
      localStore.hardware = state.hardware
    },
    setNowTimeout(state, v) {
      _.isUndefined(v) ? state.nowTimeout-- : state.nowTimeout = v
    },
    isFullscreen(state, v) {
      state.isFullscreen = v
    },
    _isAutoLeave(state, v) {
      if (state.hospital && v) {
        state.nowTimeout = state.hospital.exit_timeout
      }
      state.isAutoLeave = v
      globalConfig.autoLeavelEl.click()
    }
  },
  actions: {
    isAutoLeave({ commit, state }, v) {
      // 如果isAutoLeave状态为false并且入参也为false，就把后者的false存起来
      // 之后只能由改变从false改变true
      if (!state.isAutoLeave && !v) {
        autoLeaveQueue.push(v)
      } else {
        commit("_isAutoLeave", v)
        !_.isEmpty(autoLeaveQueue) && commit("_isAutoLeave", autoLeaveQueue.shift())
      }
    }
  },
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
    },
    getWinCode(state) {
      if (state.hospital) {
        return state.hospital.winConfig.win_code
      }
    },
    getExtInfo(state) {
      if (state.hospital && state.hospital.ext_info) {
        return JSON.parse(state.hospital.ext_info)
      }
    }
  }
}