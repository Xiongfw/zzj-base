<template>
  <div>
    <bem-button @click="showInput = !showInput">显示键盘</bem-button>
    <bem-keypad :showKeyPad="showInput" :setContent="inputVal" v-on:changeNum="changePwd"></bem-keypad>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInput: false,
      inputVal: ""
    };
  },
  methods: {
    //获取键盘输入内容
    changePwd(content, num) {
      console.log('content->', content)
      console.log('num->', num)
    }
  }
};
</script>

<style>
</style>
