import Vue from 'vue';
import VueRouter from "vue-router";

import Setup from '../views/Setup'
import Index from '../views/Index'
import Logcat from '../views/Logcat'
import Alert from '../views/Alert'
import CheckVersion from '../views/CheckVersion'
import Button from '../views/Button'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/setup', component: Setup },
    { path: '/logcat', component: Logcat },
    { path: '/alert', component: Alert },
    { path: '/button', component: Button },
    { path: '/checkVersion', component: CheckVersion },
  ]
})

export default router


