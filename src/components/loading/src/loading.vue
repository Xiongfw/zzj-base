<template>
  <div v-if="visible" class="bem--fullscreen bem-loading-mask">
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
      this.visible
        ? globalConfig.store.dispatch("isAutoLeave", false)
        : globalConfig.store.dispatch("isAutoLeave", true);
    }
  }
};
</script>