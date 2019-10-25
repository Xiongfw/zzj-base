<template>
  <div></div>
</template>

<script>
import CountDown from "@/utils/countDown.js";
import { ZWLApi } from "@/api/index.js";
import { getAllByTime, remove } from "@/lib/logger/index.js";

export default {
  name: "BemUploadLogs",
  mounted() {
    this.startLoop();
  },
  beforeDestroy() {
    this.stopLoop();
  },
  data() {
    return {
      lock: true
    };
  },
  props: {
    // 上传日志间隔
    interval: {
      type: Number,
      default: 10
    },
    // 日志一次上传条数
    count: {
      type: Number,
      default: 5
    },
    // 上传多少小时内的日志, 默认48小时内
    time: {
      type: String,
      default: "48"
    }
  },
  methods: {
    /** 轮询每次执行 */
    async uploadLogs(logs) {
      this.lock = false;
      try {
        if (this.$hospital.log_level) {
          logs = logs.filter(log => log.level === this.$hospital.log_level);
        }
        if (logs.length > 0) {
          logs = logs.slice(0, this.count);
          logs.forEach(log => {
            log.in_param = log.in_param ? JSON.stringify(log.in_param) : "";
            log.out_param = log.out_param ? JSON.stringify(log.out_param) : "";
          });
          await ZWLApi.receiveLogs({ zzjWebLogsList: logs }, { alert: false });
          remove(logs);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.lock = true;
      }
    },
    /** 开始轮询 */
    startLoop() {
      CountDown.ticker({
        ticker: "UploadLogsTicker",
        step: this.interval * 1000,
        callback: () => {
          // 后台日志等级不为none&&当前没有日志在上传&&日志不为空 则上传日志
          if (!this.$hospital && !this.$hospital.log_level) return;
          if (this.$hospital.log_level == "none" || !this.lock) return;
          getAllByTime(
            res => {
              Array.isArray(res) && res.length > 0 && this.uploadLogs(res);
            },
            this.time,
            "h"
          );
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
