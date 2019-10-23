<template>
  <div class="bem__api-url">
    <bem-popup :show.sync="visible" @close="close" title="设置" width="85%">
      <ul>
        <li>
          <p class="label">网关地址</p>
          <input @keyup.enter="save" type="search" v-model="gateway" />
        </li>
        <li>
          <p class="label">账号</p>
          <input @keyup.enter="save" type="search" v-model="username" />
        </li>
        <li>
          <p class="label">密码</p>
          <input @keyup.enter="save" type="password" v-model="password" />
        </li>
      </ul>
      <div slot="footer">
        <bem-button @click="save">确定</bem-button>
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
      gateway: null,
      username: "",
      password: ""
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
        this.init();
      }
      this.visible = this.show;
    }
  },
  methods: {
    init() {
      this.gateway = localStore.gateway;
      this.username = localStore.username;
    },
    save() {
      if (this.gateway.endsWith("/")) {
        this.gateway = this.gateway.slice(0, -1);
      }
      localStore.gateway = this.gateway;
      localStore.username = this.username;
      localStore.password = this.password;
      localStore.authorization = null;
      refresh();
    },
    reset() {
      this.gateway = "https://zzjapi.linkingcloud.cn";
      let username, password;
      const { hostname } = window.location;
      if (/(\d{1,3}\.){3}\d{1,3}/.test(hostname)) {
        username = hostname;
        password = "80138013";
      } else {
        password = username = "";
      }
      this.username = username;
      this.password = password;
    },
    close() {
      this.$emit("update:show", false);
    }
  }
};
</script>
