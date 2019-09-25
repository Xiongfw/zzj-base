<template>
  <div>
    <bem-button @click="isShowOldKeypad = !isShowOldKeypad">显示键盘</bem-button>
    <bem-button @click="isShowNewKeypad = !isShowNewKeypad">显示新键盘</bem-button>
    <!-- <div style="height:4rem;width:4rem;">
      <bem-keypad-2 :setContent="inputVal" :showKeyPad="isShowOldKeypad" v-on:changeNum="changePwd"></bem-keypad-2>
    </div>-->
    <bem-keypad :show.sync="isShowNewKeypad" :v-model="username">
      <div slot="header" style="text-align:center;">
        <input
          style="font-size:0.3rem;border:1px solid #82848a;padding:0.1rem 0.1rem;"
          type="text"
          v-model="username"
        />
        <input
          style="font-size:0.3rem;border:1px solid #82848a;padding:0.1rem 0.1rem;"
          type="text"
          v-model="password"
        />
      </div>
    </bem-keypad>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowNewKeypad: false,
      isShowOldKeypad: false,
      username: null,
      password: null
    };
  },
  methods: {
    //获取键盘输入内容
    changePwd(content, num) {
      console.log("content->", content);
      console.log("num->", num);
    }
  }
};
</script>

<style>
</style>
