<template>
  <div class="keypad--number">
    <div class="keypad--number__col-1">
      <span @click="handleKeyClick(value)" class="keypad__key-btn" v-for="value in col1">{{value}}</span>
      <span @click="switchType('letter')" class="keypad__key-btn">字母</span>
    </div>
    <div class="keypad--number__col-2">
      <span @click="handleKeyClick(value)" class="keypad__key-btn" v-for="value in col2">{{value}}</span>
    </div>
    <div class="keypad--number__col-3">
      <span @click="handleKeyClick(value)" class="keypad__key-btn" v-for="value in col3">{{value}}</span>
      <span @click="exit" class="keypad__key-btn">退出</span>
    </div>
    <div class="keypad--number__col-4">
      <span @click="del" class="keypad__key-btn">删除</span>
      <span @click="confirm" class="keypad__key-btn">确定</span>
      <span @click="clear" class="keypad__key-btn">清空</span>
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "KeypadNumber",
  mixins: [mixin],
  data() {
    return {
      col1: ["1", "4", "7"],
      col2: ["2", "5", "8", "0"],
      col3: ["3", "6", "8"]
    };
  }
};
</script>