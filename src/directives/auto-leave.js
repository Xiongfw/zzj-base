import CountDown from "@/utils/countDown.js";
import globalConfig from "@/globalConfig.js";
import localStore from '@/store/local.js'
import _ from 'lodash'

var store, timeoutId;
var endCallback, beforeCountDown;
var setNowTimeout = null;

function autoleave() {
  const exit_timeout = localStore.hospital.exit_timeout || 180
  setNowTimeout(exit_timeout)
  CountDown.ticker({
    ticker: "AutoLeaveTimer",
    step: 1000,
    stopCount: exit_timeout,
    callback: () => {
      setNowTimeout(store.state.common.nowTimeout - 1)
    },
    endCallback() {
      _.isFunction(endCallback) && endCallback()
    }
  });
}

function handleClick() {
  setNowTimeout(null)
  timeoutId && clearTimeout(timeoutId);
  CountDown.stop("AutoLeaveTimer");
  // 三种状态不会自动退出
  // 自动退出状态为false
  // 没有传beforeCountDown并且当前页面是首页
  // 传了beforeCountDown且返回false
  const m = [
    () => !store.state.common.isAutoLeave,
    () => !_.isFunction(beforeCountDown) && location.hash === '#/',
    () => _.isFunction(beforeCountDown) && beforeCountDown() === false
  ]
  if (m.some(item => item())) {
    return
  }
  timeoutId = setTimeout(autoleave, 5000);
}

export default {
  name: 'auto-leave',
  value: {
    inserted: function (el, binding) {
      globalConfig.el = el
      if (_.isPlainObject(binding.value)) {
        ({ endCallback, beforeCountDown } = binding.value)
      } else if (_.isFunction(binding.value)) {
        endCallback = binding.value
      }
      store = globalConfig.store
      setNowTimeout = p => store.commit('setNowTimeout', p);
      el.addEventListener('click', handleClick);
    }
  }
}