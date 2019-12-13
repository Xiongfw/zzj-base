<template>
  <div>
    <bem-progress :percentage="percentage">
      <p>支付</p>
      <p>处理中</p>
    </bem-progress>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 0
    };
  }
};
</script>

<style>
</style>