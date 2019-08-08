//统一支付接口地址
let Unified_Payment_URL = "https://zzjpayapi.linkingcloud.cn/api/"
//服务窗接口地址
let Service_Window_URL = "https://zzjfwcapi.linkingcloud.cn/api/"
//后台管理地址
let ORG_CONFIG_URL = "https://zzjadminapi.linkingcloud.cn/api/"


// 开发环境的常量地址
if (process.env.NODE_ENV == "development") {
}

export default {
  Unified_Payment_URL,
  Service_Window_URL,
  ORG_CONFIG_URL,
}