// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router/index'
import { install } from "../src/index"

Vue.config.productionTip = false

Vue.use(Vuex)
const store = new Vuex.Store()

Vue.use(install, {
  store
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  router,
  template: '<App/>'
})