<template>
  <div>
    <button class="bem-button" @click="show = !show">显示日志</button>
    <bem-logcat :show.sync="show"></bem-logcat>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>

<style>
</style>
