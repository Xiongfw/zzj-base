import localStore from "@/store/local.js";

//统一支付接口地址
let Unified_Payment_URL = localStore.payUrl || "https://zzjpayapi.linkingcloud.cn/api/"
//服务窗接口地址
let Service_Window_URL = localStore.fwcUrl || "https://zzjfwcapi.linkingcloud.cn/api/"
//后台管理地址
let ORG_CONFIG_URL = localStore.adminUrl || "https://zzjadminapi.linkingcloud.cn/api/"

const isExistApiUrl = () => localStore.payUrl && localStore.fwcUrl && localStore.adminUrl

// 当接口地址本地没有
if (!isExistApiUrl()) {
  const { hostname } = location
  //如果地址为内网地址
  if (/(\d{1,3}\.){3}\d{1,3}/.test(location.hostname)) {
    Unified_Payment_URL = `http://${hostname}:8012/api/`
    Service_Window_URL = `http://${hostname}:8013/api/`
    ORG_CONFIG_URL = `http://${hostname}:8014/api/`
  }
  localStore.payUrl = Unified_Payment_URL
  localStore.fwcUrl = Service_Window_URL
  localStore.adminUrl = ORG_CONFIG_URL
}

/* 开发环境的常量地址 */
if (process.env.NODE_ENV == "development") {
  // localStore.adminUrl = "http://192.168.0.119:8085/api/"
}

export default {
  Unified_Payment_URL,
  Service_Window_URL,
  ORG_CONFIG_URL,
}