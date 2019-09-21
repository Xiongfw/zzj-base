<template>
  <div :style="{width}" class="bem-keypad" v-if="visible">
    <div class="keypad__header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div :style="keypadStyle" class="keypad__main">
      <keep-alive>
        <component :is="inputType" @confirm="confirm" @exit="exit" @switchType="switchType" v-model="content"></component>
      </keep-alive>
    </div>
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
      if (this.show) {
        this.content = "";
      }
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
    },
    width: {
      type: String,
      default: "70%"
    },
    height: {
      type: String,
      default: "4rem"
    }
  },
  computed: {
    keypadStyle() {
      return {
        height: this.height
      };
    }
  },
  methods: {
    /** 关闭键盘 */
    close() {
      setTimeout(() => {
        this.$emit("update:show", false);
      }, 60);
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
      setTimeout(() => {
        this.inputType = type;
      }, 60);
    }
  }
};
</script>