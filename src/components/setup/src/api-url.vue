<template>
  <div class="bem__api-url">
    <bem-popup :show.sync="visible" @close="close" title="设置" width="85%">
      <ul>
        <li>
          <p class="label">网关地址</p>
          <input type="search" v-model="gateway" />
        </li>
      </ul>
      <div slot="footer">
        <bem-button @click="save">保存</bem-button>
        <bem-button @click="reset" type="info">重置</bem-button>
      </div>
    </bem-popup>
  </div>
</template>

<script>
import localStore from "@/store/local.js";
import { refresh } from "@/utils/index.js";

export default {
  data() {
    return {
      visible: false,
      gateway: null
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.gateway = localStore.gateway;
      }
      this.visible = this.show;
    }
  },
  methods: {
    save() {
      if (this.gateway.endsWith("/")) {
        this.gateway = this.gateway.slice(0, -1);
      }
      localStore.gateway = this.gateway;
      refresh();
    },
    reset() {
      this.gateway = "https://zzjapi.linkingcloud.cn";
    },
    close() {
      this.$emit("update:show", false);
    }
  }
};
</script>
