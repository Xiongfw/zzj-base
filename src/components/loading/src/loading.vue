<template>
  <div v-if="visible" class="bem--fullscreen bem-loading-mask">
    <img src="../../../assets/imgs/loading.gif" />
  </div>
</template>

<script>

export default {
  name: "BemLoading",
  data() {
    return {
      visible: false
    };
  }
};
</script>