import localStore from "@/store/local.js";

// 网关地址
let gateway = localStore.gateway || "https://zzjapi.linkingcloud.cn"
// 统一支付接口地址
let unified_payment_url
// 服务窗接口地址
let service_window_url
// 后台管理地址
let org_config_url
// 日志接口地址
let logs_url
/** 本地硬件地址 */
let ext_device_url = "http://localhost:8099/api/"

if (localStore.hospital && localStore.hospital.ext_info) {
  const { devUrl } = JSON.parse(localStore.hospital.ext_info)
  devUrl && (ext_device_url = `http://${devUrl}/api/`)
}

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

logs_url = gateway + '/logs/api/'
unified_payment_url = localStore.payUrl = gateway + '/pay/api/'
service_window_url = localStore.fwcUrl = gateway + '/fwc/api/'
org_config_url = localStore.adminUrl = gateway + '/admin/api/'

/* 开发环境的常量地址 */
if (process.env.NODE_ENV == "development") {
  // org_config_url = "http://192.168.0.119:8085/api/"
  // ext_device_url = 'https://www.fastmock.site/mock/c4908aad6220f675ede43a9ee04ec7f4/api/'
}

export default {
  unified_payment_url,
  service_window_url,
  org_config_url,
  logs_url,
  ext_device_url
}