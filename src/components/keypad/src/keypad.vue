<template>
  <div class="bem-keypad" style="width:80%" v-if="visible">
    <keep-alive>
      <component :is="inputType" @confirm="confirm" @exit="exit" @switchType="switchType" v-model="content"></component>
    </keep-alive>
  </div>
</template>

<script>
import KeypadNumber from "./number.vue";
import KeypadLetter from "./letter.vue";

export default {
  name: "BemKeypad",
  components: {
    number: KeypadNumber,
    letter: KeypadLetter
  },
  data() {
    return {
      visible: this.show,
      // 当前输入面板类型
      inputType: this.type,
      // 输入的内容
      content: null
    };
  },
  watch: {
    type() {
      this.inputType = this.type;
    },
    show() {
      this.visible = this.show;
    },
    content() {
      this.$emit("input", this.content);
    }
  },
  props: {
    value: String,
    type: {
      type: String,
      default: "number"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /** 关闭键盘 */
    close() {
      this.$emit("update:show", false);
    },
    /* 确定 */
    confirm() {
      if ("confirm" in this.$listeners) {
        this.$emit("confirm");
      } else {
        this.close();
      }
    },
    /* 退出 */
    exit() {
      this.close();
      this.$emit("exit");
    },
    /* 切换输入 */
    switchType(type) {
      this.inputType = type;
    }
  }
};
</script>