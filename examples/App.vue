<template>
  <div id="app" v-auto-leave="handleAutoLeave">
    <router-view class="app-main"></router-view>
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
      this.$router.replace("/");
    }
  }
};
</script>

<style>
.app-main {
  padding: 0.2rem 0.3rem;
}
</style>
