<template>
  <div>
    <button class="bem-button" @click="handleClick1">确定对话框</button>
    <button class="bem-button" @click="handleClick2">加取消对话框</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleClick1() {
      this.$bem.showalert({
        content: '测试内容',
        onClose(confirm) {
          // console.log(confirm);
        }
      });
    },
    handleClick2() {
      this.$bem.showalert({
        content: "测试内容",
        showCancel: true,
        // isAutoExit: false,
        onClose(confirm) {
          // console.log(confirm);
        }
      });
    }
  }
};
</script>

<style>
</style>
