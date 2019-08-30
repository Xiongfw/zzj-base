export default {
  // 自动退出指令绑定的dom元素
  autoLeavelEl: null,
  // el元素
  el: null,
  // 必传，vuex实例
  store: null,
  // 非必填，默认自适应
  fontSize: null,
  // 日志选项，操作人ID和姓名
  logger: {
    oper_id: null,
    oper_name: null
  },
  // 音频播放选项
  audio: {
    baseUrl: 'https://zzjfaceapp.linkingcloud.cn/audio/'
  }
}