<template>
  <div class="keypad--letter">
    <div class="keypad--letter__row-1">
      <span @click="handleKeyClick(value)" class="keypad__key-btn" v-for="value in row1">{{value}}</span>
    </div>
    <div class="keypad--letter__row-2">
      <span @click="handleKeyClick(value)" class="keypad__key-btn" v-for="value in row2">{{value}}</span>
    </div>
    <div class="keypad--letter__row-3">
      <span :class="[{'keypad__key-btn--longpress': capsLock}, 'keypad__key-btn']" @click="switchCapsLock">大写</span>
      <span @click="handleKeyClick(value)" class="keypad__key-btn" v-for="value in row3">{{value}}</span>
      <span @click="del" class="keypad__key-btn">删除</span>
    </div>
    <div class="keypad--letter__row-4">
      <span @click="switchType('number')" class="keypad__key-btn">数字</span>
      <span @click="exit" class="keypad__key-btn">退出</span>
      <span @click="clear" class="keypad__key-btn">清空</span>
      <span @click="confirm" class="keypad__key-btn">确定</span>
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "KeypadLetter",
  mixins: [mixin],
  data() {
    return {
      capsLock: false
    };
  },
  computed: {
    row1() {
      const lowerCase = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
      const upperCase = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
      return this.capsLock ? upperCase : lowerCase;
    },
    row2() {
      const lowerCase = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
      const upperCase = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
      return this.capsLock ? upperCase : lowerCase;
    },
    row3() {
      const lowerCase = ["z", "x", "c", "v", "b", "n", "m"];
      const upperCase = ["Z", "X", "C", "V", "B", "N", "M"];
      return this.capsLock ? upperCase : lowerCase;
    }
  },
  methods: {
    /** 切换大写 */
    switchCapsLock() {
      this.capsLock = !this.capsLock;
    }
  }
};
</script>