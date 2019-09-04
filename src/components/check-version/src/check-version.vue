<template>
  <bem-popup :show.sync="showTip" :showClose="false" fullscreen>
    <div class="bem-check-version">
      <img class="icon" src="../../../assets/imgs/warn-icon.png" />
      <p class="tip-text">暂停使用，系统维护中</p>
    </div>
  </bem-popup>
</template>

<script>
import CountDown from "@/utils/countDown.js";
import localStore from "@/store/local.js";
import { OrgConfigApi } from "@/api/index.js";
import { refresh } from "@/utils/index.js";
import _ from "lodash";

export default {
  name: "BemCheckVersion",
  data() {
    return {
      showTip: false
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
      if (version === "stop") {
        this.showTip = true;
      } else if (_.isEmpty(localStore.version)) {
        localStore.version = version;
      } else if (localStore.version != version) {
        localStore.version = version;
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
