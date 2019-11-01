<template>
  <bem-popup :show.sync="isShowTip" :showClose="false" fullscreen>
    <div class="bem-check-version">
      <p class="tip-text">系统维护中，{{ tip }}</p>
    </div>
  </bem-popup>
</template>

<script>
import CountDown from "@/utils/countDown.js";
import localStore from "@/store/local.js";
import { clear as logClear, getAllByTime, remove as logRemove } from "@/lib/logger/index.js";
import { OrgConfigApi } from "@/api/index.js";
import { refresh } from "@/utils/index.js";
import { ZWLApi } from "@/api/index.js";
import { isString, isEmpty } from "lodash";

export default {
  name: "BemCheckVersion",
  data() {
    return {
      isShowTip: false,
      tip: "暂停使用"
    };
  },
  mounted() {
    this.checkVersion();
  },
  beforeDestroy() {
    this.cancelCheckVersion();
  },
  props: {
    // 检测更新间隔，默认60秒
    interval: {
      type: Number,
      default: 60
    }
  },
  methods: {
    /** 获取版本更新 */
    async getVersion() {
      const version = await OrgConfigApi.getVersionById({
        orgId: this.$orgId,
        winConfigId: this.$winConfigId
      });
      if (version.startsWith("uploadLogs") && version.includes(this.$winCode)) {
        /* uploadLogs|face_zzj|48|h 单独上传face_zzj48小时内日志*/
        this.uploadLogsByWinCode(version);
      } else if (isString(version) && version.startsWith("stop")) {
        /* stop|15分钟 系统维护中 请等待15分钟 */
        version.includes("|") && (this.tip = "请等待" + version.split("|")[1]);
        this.isShowTip = true;
      } else if (version === "clear") {
        /* clera 清除所有日志 */
        logClear();
      } else if (isEmpty(localStore.version)) {
        /* 保存版本号 */
        localStore.version = version;
      } else if (localStore.version != version) {
        /* 刷新自助机 */
        localStore.version = version;
        const hospInfo = await OrgConfigApi.getOrgWinconfigDetail({
          orgId: this.$orgId,
          winConfigId: this.$winConfigId
        });
        this.$store.commit("setHospital", hospInfo);
        refresh();
      }
    },
    /** 开始查询版本 */
    checkVersion() {
      if (!this.$hospital) {
        throw new Error("该机器未初始化");
      }
      CountDown.ticker({
        ticker: "CheckVersionTicker",
        step: this.interval * 1000,
        callback: () => {
          this.getVersion();
        }
      });
    },
    /** 取消查询版本 */
    cancelCheckVersion() {
      CountDown.stop("CheckVersionTicker");
    },
    /* 上传并删除单独自助机48小时内日志 */
    uploadLogsByWinCode(version) {
      // uploadLogs|face_zzj|48|h => ["uploadLogs", "face_zzj", "48", "h"]
      const splitRes = version.split("|");
      let timeValue = splitRes[2] || "48";
      let timeUnit = splitRes[3] || "h";
      getAllByTime(uploadLogs, timeValue, timeUnit);
      async function uploadLogs(res) {
        await ZWLApi.receiveLogs({ zzjWebLogsList: res }, { alert: false });
        logRemove(res);
      }
    }
  }
};
</script>
