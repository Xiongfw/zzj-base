<template>
  <div class="bem__api-url">
    <bem-popup :show.sync="visible" @close="close">
      <ul>
        <li>
          <p class="label">服务窗地址</p>
          <input type="search" v-model="fwcUrl" />
        </li>
        <li>
          <p class="label">统一支付平台地址</p>
          <input type="search" v-model="payUrl" />
        </li>
        <li>
          <p class="label">管理后台地址</p>
          <input type="search" v-model="adminUrl" />
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
      fwcUrl: null,
      payUrl: null,
      adminUrl: null
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
        this.fwcUrl = localStore.fwcUrl;
        this.payUrl = localStore.payUrl;
        this.adminUrl = localStore.adminUrl;
      }
      this.visible = this.show;
    }
  },
  methods: {
    save() {
      localStore.fwcUrl = this.fwcUrl;
      localStore.payUrl = this.payUrl;
      localStore.adminUrl = this.adminUrl;
      refresh();
    },
    reset() {
      this.fwcUrl = "https://zzjfwcapi.linkingcloud.cn/api/";
      this.payUrl = "https://zzjpayapi.linkingcloud.cn/api/";
      this.adminUrl = "https://zzjadminapi.linkingcloud.cn/api/";
    },
    close() {
      this.$emit("update:show", false);
    }
  }
};
</script>
