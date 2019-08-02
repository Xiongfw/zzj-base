import Vue from 'vue'
import loadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(loadingVue)

LoadingConstructor.prototype.close = function () {
  this.visible = false
}

LoadingConstructor.prototype.show = function () {
  this.visible = true
}

const Loading = (options = {}) => {
  let vm = new LoadingConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(vm.$el);
  return vm
}

export default Loading()