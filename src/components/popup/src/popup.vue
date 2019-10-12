<template>
  <div class="bem-popup" v-if="show">
    <div :style="maskStyle" @click="handleClickMask" class="bem-popup__mask" v-if="mask"></div>
    <div :style="mainStyle" class="bem-popup__main">
      <div :style="headerStyle" class="bem-popup__header">
        <slot name="title">
          <span class="bem-popup__title">{{ title }}</span>
        </slot>
        <img
          :style="closeStyle"
          @click="close"
          class="bem-popup__close"
          src="../../../assets/imgs/close_icon.png"
          v-if="showClose"
        />
      </div>
      <div class="bem-popup__body">
        <slot></slot>
      </div>
      <div class="bem-popup__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import globalConfig from "@/globalConfig.js";

export default {
  name: "BemPopup",
  data() {
    return {};
  },
  computed: {
    closeStyle() {
      const style = {};
      if (this.fullscreen) {
        style.top = "0.1rem";
        style.right = "0.1rem";
      }
      return style;
    },
    headerStyle() {
      const style = {};
      if (this.$slots.title || this.title) {
        style.padding = "0.3rem 0.3rem 0.2rem";
      }
      this.center && (style.textAlign = "center");
      return style;
    },
    maskStyle() {
      const style = {};
      if (document.querySelector(globalConfig.el)) {
        style.position = "absolute";
      }
      return style;
    },
    mainStyle() {
      const style = {};
      if (document.querySelector(globalConfig.el)) {
        style.position = "absolute";
      }
      style.marginTop = this.top;
      style.width = this.width;
      if (this.fullscreen) {
        style.height = "100%";
        style.width = "100%";
        style.borderRadius = "0";
      }
      return style;
    }
  },
  methods: {
    handleClickMask() {
      if (!this.closeOnClickMask) this.close();
    },
    close() {
      this.$emit("update:show", false);
      this.$emit("close");
    }
  },
  props: {
    // 弹窗宽度
    width: {
      type: String,
      default: "50%"
    },
    // 弹窗距离顶部距离
    top: {
      type: String,
      default: ""
    },
    // 是否全屏显示
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    //标题是否居中
    center: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      required: true
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 是否可以通过点击 mask 关闭
    closeOnClickMask: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    }
  }
};
</script>

