import * as api from "./api/index.js"
import init from './init.js'
import { error } from './lib/logger/index.js'
import storeCommon from './store/vuex.js'
import globalConfig from './globalConfig.js'
import _ from 'lodash'

import showalert from './components/alert/index.js'
import audio from './lib/audio/index.js'
import loading from './components/loading/index.js'
import components from './components/index.js'
import directives from './directives/index.js'
import mixins from './mixins/index.js'

const install = function (Vue, config = globalConfig) {
  config = _.defaultsDeep(config, globalConfig)
  const { store } = config
  Object.keys(globalConfig).forEach(key => {
    globalConfig[key] = config[key]
  })
  // vuex注册通用模块
  if (store && typeof store.registerModule === 'function') {
    store.registerModule('common', storeCommon)
  } else {
    throw new Error('请传入Vuex实例对象')
  }
  init(config)
  // 全局捕获异常
  Vue.config.errorHandler = function (err, vm, info) {
    const arr = [info, vm.$options.name, err.message, err.stack]
    console.error(err)
    error({ desc: err.message, data: arr.join('<br>') })
  }
  // 注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // 全局指令
  directives.forEach(directive => {
    Vue.directive(directive.name, directive.value)
  })
  // 全局混入
  Vue.mixin(mixins)

  Vue.prototype.$bem = {
    showalert,
    loading,
    api,
    audio
  }
}

export default install