<template>
  <div class="bem--fullscreen bem-loading-mask" v-show="visible">
    <img src="../../../assets/imgs/loading.gif" />
  </div>
</template>

<script>
import globalConfig from "@/globalConfig.js";

export default {
  name: "BemLoading",
  data() {
    return {
      visible: false
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