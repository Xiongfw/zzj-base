<template>
  <div>
    <bem-setup :show="showSetup"></bem-setup>
  </div>
</template>

<script>
export default {
  created() {
    this.showSetup = true;
  },
  data() {
    return {
      showSetup: false
    };
  }
};
</script>

<style>
</style>
