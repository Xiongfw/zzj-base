<template>
  <div class="bem-alert-mask bem--fullscreen" v-show="visible">
    <div class="bem-alert-box">
      <div class="bem-alert-box__header" v-if="showTitle">{{ title }}</div>
      <div class="bem-alert-box__content" v-html="content"></div>
      <div class="bem-alert-box__btns">
        <bem-button v-if="showCancel" @click="handleAction(false)" class="btn--cancel" >{{cancelText}}</bem-button>
        <bem-button @click="handleAction(true)">
          {{confirmText}}
          <span v-if="isAutoExit">({{time}})</span>
        </bem-button>
      </div>
    </div>
  </div>
</template>

<script>
import globalConfig from "@/globalConfig.js";
import BemButton from "@/components/button/index.js";

export default {
  name: "BemAlert",
  mounted() {
    if (this.isAutoExit) {
      const timeId = setInterval(() => {
        if (this.time-- <= 1) {
          this.handleAction(true);
          clearInterval(timeId);
        }
      }, 1000);
    }
  },
  components: {
    BemButton
  },
  data() {
    return {
      // 点击取消false, 确定true
      confirm: true,
      // 是否可见
      visible: false,
      // 显示标题
      showTitle: true,
      // 标题
      title: "提示",
      // 内容
      content: "",
      // 是否显示取消按钮
      showCancel: false,
      // 取消按钮文本内容
      cancelText: "取消",
      // 确定按钮文本内容
      confirmText: "确定",
      // 倒计时时间
      time: 10,
      // 是否自动退出
      isAutoExit: true,
      // 关闭回调事件
      onClose: null
    };
  },
  watch: {
    visible(val) {
      if (val) {
        globalConfig.store.dispatch("isAutoLeave", false)
      } else {
        globalConfig.store.dispatch("isAutoLeave", true)
        typeof this.onClose === "function" && this.onClose(this.confirm);
        setTimeout(() => {
          this.$el.parentNode.removeChild(this.$el);
          this.$destroy();
        });
      }
    }
  },
  methods: {
    handleAction(action) {
      this.confirm = action;
      this.visible = false;
    }
  }
};
</script>