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
import { clear as logClear } from "@/lib/logger/index.js";
import { OrgConfigApi } from "@/api/index.js";
import { refresh } from "@/utils/index.js";
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
      if (isString(version) && version.startsWith("stop")) {
        version.includes("_") && (this.tip = "请等待" + version.split("_")[1]);
        this.isShowTip = true;
      } else if (version === "clear") {
        logClear();
      } else if (isEmpty(localStore.version)) {
        localStore.version = version;
      } else if (localStore.version != version) {
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
    }
  }
};
</script>
