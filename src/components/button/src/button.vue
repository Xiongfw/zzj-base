<template>
  <button
    :class="[
      size ? `bem-button--${size}` : '',
      type ? `bem-button--${type}` : '',
      {
        'is-stereo' : stereo,
        'is-disabled' : disabled,
        'is-round': round,
        'is-plain': plain,
        'is-transparent': plain && !transparent
      }
    ]"
    :disabled="disabled"
    :type="nativeType"
    @click="handleClick"
    class="bem-button"
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
    // 按钮类型  success / warning / danger / info / transparent / white
    type: String,
    nativeType: {
      type: String,
      default: "button"
    },
    plain: Boolean,
    // 立体按钮
    stereo: Boolean,
    // 圆角按钮
    round: Boolean,
    // 背景透明
    transparent: Boolean,
    // 是否禁用状态
    disabled: Boolean
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>
