import localStore from "@/store/local.js";

// 网关地址
let gateway = localStore.gateway || "https://zzjapi.linkingcloud.cn"
// 统一支付接口地址
let Unified_Payment_URL
// 服务窗接口地址
let Service_Window_URL
// 后台管理地址
let ORG_CONFIG_URL
// 日志接口地址
let Logs_URL

// 没有配置网关地址
if (!localStore.gateway) {
  const { hostname } = location
  //如果地址为内网地址
  if (/(\d{1,3}\.){3}\d{1,3}/.test(hostname)) {
    gateway = `http://${hostname}:8013`
  }
  localStore.gateway = gateway
}

// gateway = 'http://192.168.0.119:8090'

Logs_URL = gateway + '/logs/api/'
Unified_Payment_URL = localStore.payUrl = gateway + '/pay/api/'
Service_Window_URL = localStore.fwcUrl = gateway + '/fwc/api/'
ORG_CONFIG_URL = localStore.adminUrl = gateway + '/admin/api/'

/* 开发环境的常量地址 */
if (process.env.NODE_ENV == "development") {
  // ORG_CONFIG_URL = "http://192.168.0.119:8085/api/"
}

export default {
  Unified_Payment_URL,
  Service_Window_URL,
  ORG_CONFIG_URL,
  Logs_URL
}