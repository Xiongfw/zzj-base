<template>
  <div class="bem-progress">
    <div :style="circleStyle" class="bem-progress-circle">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/200/svg">
        <circle
          :r="radius"
          :stroke-width="strokeWidth"
          class="el-progress-circle__track"
          cx="50"
          cy="50"
          fill="none"
          stroke="#e5e9f2"
        />
        <circle
          :r="radius"
          :stroke-linecap="strokeLinecap"
          :stroke-width="strokeWidth"
          :style="circlePathStyle"
          class="el-progress-circle__path"
          cx="50"
          cy="50"
          fill="none"
          stroke="#2C8DF0"
        />
      </svg>
      <div class="el-progress__text" v-if="$slots.default">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BemProgress",
  props: {
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    width: {
      type: String,
      default: "3rem"
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    strokeLinecap: {
      type: String,
      default: "round"
    }
  },
  computed: {
    perimeter() {
      return 2 * Math.PI * this.radius;
    },
    radius() {
      return 50 - this.strokeWidth / 2;
    },
    circleStyle() {
      return {
        height: this.width,
        width: this.width
      };
    },
    circlePathStyle() {
      return {
        strokeDasharray: `${this.perimeter * (this.percentage / 100)} ${this.perimeter + 1}`,
        transformOrigin: "center",
        strokeDashoffset: 1,
        transform: "rotate(-90deg)",
        transition: "stroke-dasharray 0.6s ease 0s"
      };
    }
  }
};
</script>
