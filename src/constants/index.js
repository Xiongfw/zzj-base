// //统一支付接口地址
// let Unified_Payment_URL = "https://zzjpayapi.linkingcloud.cn/api/"
// //服务窗接口地址
// let Service_Window_URL = "https://zzjfwcapi.linkingcloud.cn/api/"
// //后台管理地址
// let ORG_CONFIG_URL = "https://zzjadminapi.linkingcloud.cn/api/"
//统一支付接口地址
let Unified_Payment_URL = "http://192.168.0.119:8012/api/"
//服务窗接口地址
let Service_Window_URL = "http://192.168.0.119:8013/api/"
//后台管理地址
let ORG_CONFIG_URL = "http://192.168.0.119:8014/api/"


// 开发环境的常量地址
if (process.env.NODE_ENV == "development") {
  // WEB_SOCKET_URL = "ws://192.168.0.119:8085/websocket/"
  // Unified_Payment_URL = "http://192.168.0.119:8888/api/"
  // Service_Window_URL = "http://192.168.0.119:8088/api/"
  // ORG_CONFIG_URL = "http://192.168.0.119:8085/api/"
}

export default {
  Unified_Payment_URL,
  Service_Window_URL,
  WEB_SOCKET_URL,
  ORG_CONFIG_URL,
}