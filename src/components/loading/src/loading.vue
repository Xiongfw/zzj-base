<template>
  <div class="bem--fullscreen bem-loading-mask" v-show="visible">
    <img src="../../../assets/imgs/loading.gif" />
    <div class="bem-loading__text">
      <span>{{ loadingText }}</span>
      <span class="bem-loading__dot"></span>
    </div>
  </div>
</template>

<script>
import globalConfig from "@/globalConfig.js";

export default {
  name: "BemLoading",
  data() {
    return {
      visible: false,
      loadingText: "加载中"
    };
  },
  watch: {
    visible() {
      if (this.visible) {
        globalConfig.store.dispatch("isAutoLeave", false);
      } else {
        globalConfig.store.dispatch("isAutoLeave", true);
      }
    }
  }
};
</script>