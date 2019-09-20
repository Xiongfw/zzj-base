export default {
  activated() {
    if (this.value) {
      this.content = this.value
    }
  },
  data() {
    return {
      content: "",
    };
  },
  watch: {
    content() {
      this.$emit("input", this.content);
    }
  },
  props: {
    value: String,
  },
  methods: {
    /* 退出 */
    exit() {
      this.$emit("exit")
    },
    /* 确定 */
    confirm() {
      this.$emit("confirm")
    },
    /* 清空 */
    clear() {
      this.content = "";
    },
    /* 删除 */
    del() {
      if (!this.content) return;
      this.content = this.content.substring(0, this.content.length - 1);
    },
    /* 输入 */
    handleKeyClick(value) {
      this.content += value;
    },
    /* 切换类型 */
    switchType(type) {
      this.$emit("switchType", type)
    }
  }
}