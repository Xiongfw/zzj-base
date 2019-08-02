<template>
  <button
    @click="handleClick"
    class="bem-button"
    :class="[
      size ? `bem-button--${size}` : '',
      type ? `bem-button--${type}` : '',
      {
        'is-round': round,
        'is-plain': plain,
        'is-transparent': transparent
      }
    ]"
    :type="nativeType"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BemButton",
  props: {
    // 按钮大小 large / small
    size: String,
    // 按钮类型  success / warning / danger / info / transparent
    type: String,
    nativeType: {
      type: String,
      default: "button"
    },
    plain: Boolean,
    // 圆角按钮
    round: Boolean,
    // 背景透明
    transparent: Boolean
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>
