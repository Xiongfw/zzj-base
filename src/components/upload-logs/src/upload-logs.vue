<template>
  <div></div>
</template>

<script>
import CountDown from "@/utils/countDown.js";
import { ZWLApi } from "@/api/index.js";
import { pop as logPop, getAll } from "@/lib/logger/index.js";

export default {
  name: "BemUploadLogs",
  mounted() {
    this.startLoop();
  },
  beforeDestroy() {
    this.stopLoop();
  },
  props: {
    // 检测更新间隔
    interval: {
      type: Number,
      default: 10
    },
    // 日志一次上传条数
    count: {
      type: Number,
      default: 5
    }
  },
  methods: {
    /** 轮询每次执行 */
    async uploadLogs(res) {
      if (Array.isArray(res) && res.length > 0) {
        res.forEach(log => {
          log.in_param = log.in_param ? JSON.stringify(log.in_param) : "";
          log.out_param = log.out_param ? JSON.stringify(log.out_param) : "";
        });
        try {
          await ZWLApi.receiveLogs({ zzjWebLogsList: res }, { alert: false });
          logPop(null, this.count);
        } catch (e) {
          console.error(e);
        }
      }
    },
    /** 开始轮询 */
    startLoop() {
      CountDown.ticker({
        ticker: "UploadLogsTicker",
        step: this.interval * 1000,
        callback: () => {
          getAll(res => this.uploadLogs(res), null, this.count);
        }
      });
    },
    /** 停止轮询 */
    stopLoop() {
      CountDown.stop("UploadLogsTicker");
    }
  }
};
</script>
