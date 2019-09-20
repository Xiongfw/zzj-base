<template>
  <div id="app" v-auto-leave="handleAutoLeave">
    <router-view class="app-main" id="app-main"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$router.replace("/");
  },
  methods: {
    handleAutoLeave() {
      // this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss">
@import "../src/assets/styles/reset.scss";
@import "../src/assets/styles/index.scss";
.app-main {
  padding: 0.2rem 0.3rem;
}
</style>
