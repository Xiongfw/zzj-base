let WEB_SOCKET_URL = "ws://cloud37.linkingcloud.cn:8014/websocket/"    //WebSocket地址

let Unified_Payment_URL = "http://cloud37.linkingcloud.cn:8012/api/"        //统一支付接口地址

let Service_Window_URL = "http://cloud37.linkingcloud.cn:8013/api/"          //服务窗接口地址

let ORG_CONFIG_URL = "http://cloud37.linkingcloud.cn:8014/api/"            //后台管理地址


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