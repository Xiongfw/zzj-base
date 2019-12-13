import Vue from 'vue';
import VueRouter from "vue-router";

import Setup from '../views/Setup'
import Index from '../views/Index'
import Logcat from '../views/Logcat'
import Alert from '../views/Alert'
import CheckVersion from '../views/CheckVersion'
import UploadLogs from '../views/UploadLogs'
import Button from '../views/Button'
import Popup from '../views/Popup'
import Keypad from '../views/Keypad'
import Audio from '../views/Audio'
import Progress from '../views/Progress'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/setup', component: Setup },
    { path: '/logcat', component: Logcat },
    { path: '/alert', component: Alert },
    { path: '/button', component: Button },
    { path: '/checkVersion', component: CheckVersion },
    { path: '/uploadLogs', component: UploadLogs },
    { path: '/popup', component: Popup },
    { path: '/keypad', component: Keypad },
    { path: '/audio', component: Audio },
    { path: '/progress', component: Progress },
  ]
})

export default router


