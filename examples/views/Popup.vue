<template>
  <div>
    <bem-button @click="show = !show">显示</bem-button>
    <bem-popup :show.sync="show" width="auto">
      <span slot="title">提示</span>
      <span>一段测试内容</span>
    </bem-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<style>

</style>
