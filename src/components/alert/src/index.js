import Vue from 'vue'
import Vuex from 'vuex'
import alertVue from './alert.vue'
import _ from 'lodash'
import globalConfig from "@/globalConfig.js";

Vue.use(Vuex)
const AlertConstructor = Vue.extend(alertVue)

const Alert = (...args) => {
  let options = {}
  const length = args.length
  if (length == 1 && _.isString(args[0])) {
    options.content = args[0]
  } else if (length == 2) {
    options.content = args[0]
    options.onClose = args[1]
  } else if (length == 1 && _.isPlainObject(args[0])) {
    options = args[0]
  }
  let vm = new AlertConstructor({
    el: document.createElement('div'),
    data: options,
    store: globalConfig.store
  })
  const el = document.querySelector(globalConfig.el)
  if (el && !globalConfig.store.state.common.isFullscreen) {
    el.style.position != "relative" && (el.style.position = "relative")
    vm.$el.style.position != "absolute" && (vm.$el.style.position = "absolute")
    el.appendChild(vm.$el)
  } else {
    document.body.appendChild(vm.$el)
  }
  vm.visible = true
  return vm
}

export default Alert