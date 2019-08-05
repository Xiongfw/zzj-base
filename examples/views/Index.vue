<template>
  <div class="index-page">
    <p class="title">自助机组件库</p>
    <div class="main">
      <router-link to="/button">按钮</router-link>
      <router-link to="/setup">维护组件</router-link>
      <router-link to="/logcat">日志组件</router-link>
      <router-link to="/alert">对话框</router-link>
      <router-link to="/checkVersion">检查更新</router-link>
      <router-link to="/popup">弹出窗</router-link>
      <router-link to="/keypad">键盘</router-link>
    </div>
  </div>
</template>

<script>
export default {
  created() {
  }
};
</script>

<style lang="scss">
.index-page {
  $color: #409eff;
  padding: 0.3rem 0.5rem;
  letter-spacing: 0.05em;
  a {
    color: $color;
    text-decoration: none;
  }
  .title {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 1.4em;
    font-weight: 600;
  }
}
</style>
