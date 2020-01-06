import Vue from 'vue'
import loadingVue from './loading.vue'
import globalConfig from '@/globalConfig.js'

const LoadingConstructor = Vue.extend(loadingVue)
let vm = null

LoadingConstructor.prototype.close = function () {
  globalConfig.store.commit("setLoadingText", null)
  this.visible = false
}

LoadingConstructor.prototype.show = function () {
  vm.$emit("mount")
  if (globalConfig.store.state.common.isFullscreen) {
    vm.$el.style.position = "fixed"
  } else {
    vm.$el.style.position = "absolute"
  }
  this.loadingText = globalConfig.store.state.common.loadingText || "加载中";
  this.visible = true
}

const Loading = (options = {}) => {
  vm = new LoadingConstructor({
    el: document.createElement('div')
  })
  vm.$once("mount", function () {
    const el = document.querySelector(globalConfig.el)
    if (el) {
      el.style.position != "relative" && (el.style.position = "relative")
      el.appendChild(vm.$el)
    } else {
      document.body.appendChild(vm.$el)
    }
  })
  return vm
}

export default Loading()