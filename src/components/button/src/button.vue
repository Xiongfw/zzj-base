<template>
  <button
    @click="handleClick"
    class="bem-button"
    :class="[
      type ? `bem-button--${type}` : '',
      {
        'bem--transparent': transparent,
        'bem--round': round
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
    type: String,
    nativeType: {
      type: String,
      default: "button"
    },
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
