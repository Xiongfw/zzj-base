<template>
  <div>
    <div @click="showSetup" class="bem-setup__trigger-btn"></div>
    <div class="bem-setup bem--fullscreen" v-if="visible">
      <div class="bem-setup__fun-wrap">
        <button @click="showlog = !showlog" class="bem-setup__btn bem-setup--shadow">显示日志</button>
        <button @click="clearCache" class="bem-setup__btn bem-setup--shadow">重置机器</button>
        <button @click="openFile()" class="bem-setup__btn bem-setup--shadow">下载文件</button>
        <button @click="showApiUrl = true" class="bem-setup__btn bem-setup--shadow">网关地址</button>
      </div>
      <div class="bem-setup__select-wrap">
        <select class="bem-setup__select bem-setup--shadow" v-model="orgId">
          <option :value="0" v-show="orgId === 0">请选择医院</option>
          <option :key="item.id" :value="item.id" v-for="item in hospList">{{item.hosp_name}}</option>
        </select>
        <select class="bem-setup__select bem-setup--shadow" v-model="winConfigId">
          <option :value="0" v-show="winConfigId === 0">{{Array.isArray(winCodeList) ? '数据为空' : '请选择机器编号'}}</option>
          <option :key="item.id" :value="item.id" v-for="item in winCodeList">{{item.win_code}}</option>
        </select>
      </div>
      <button @click="init" class="bem-setup__init-btn bem-setup__btn bem-setup--shadow">初始化机器</button>
      <div class="bem-setup__hr">分辨率{{screenWidth}}x{{screenHeight}}</div>
      <h6 class="bem-setup__text--not-init" v-if="!hospInfo">暂无信息，请先初始化机器</h6>
      <ul class="bem-setup__info-wrap" v-else>
        <li v-for="key in hospitalKeys">
          <span class="label">{{ key }}:</span>
          <span class="text">{{ hospInfo[key] }}</span>
        </li>
        <li v-for="key in winConfigKeys">
          <span class="label">{{ key }}:</span>
          <span class="text">{{ hospInfo.winConfig[key] }}</span>
        </li>
        <li @click="showExtDetail">
          <span class="label">ext_info:</span>
          <span class="text ext-info">{{ hospInfo.ext_info }}</span>
        </li>
        <pre @click="showExtDetail" v-show="isShowExtDetail">{{ hospInfo.ext_info && JSON.parse(hospInfo.ext_info) }}</pre>
      </ul>
    </div>
    <bem-logcat :show.sync="showlog"></bem-logcat>
    <api-url :show.sync="showApiUrl"></api-url>
    <bem-popup :show.sync="showInput" closeOnClickMask width="auto">
      <input
        class="bem-setup__pwd-input"
        placeholder="请输入维护密码"
        readonly
        ref="theInput"
        slot="title"
        type="search"
        v-model="inputVal"
      />
      <div class="bem-setup__pwd">
        <bem-keypad-2 :setContent="inputVal" :showKeyPad="showInput" v-on:changeNum="changePwd"></bem-keypad-2>
      </div>
    </bem-popup>
  </div>
</template>

<script>
import logcat from "@/components/logcat/index";
import { OrgConfigApi, WHTApi } from "@/api/index.js";
import showalert from "@/components/alert/index";
import ApiUrl from "./api-url.vue";

export default {
  name: "BemSetup",
  mounted() {
    if (!this.storeHospital) {
      this.visible = true;
    }
  },
  components: {
    logcat,
    ApiUrl
  },
  data() {
    return {
      // 显示扩展信息详情
      isShowExtDetail: false,
      // 显示网关地址弹窗
      showApiUrl: false,
      // 显示键盘
      showInput: false,
      // 输入的密码
      inputVal: "",
      // 显示日志
      showlog: false,
      // 医院信息
      hospInfo: null,
      /* 医院信息需要展示的字段 */
      hospitalKeys: [
        "hosp_name",
        "app_id",
        "hosp_code",
        "org_code",
        "authorize_redirect_uri",
        "serv_url",
        "gate_way"
      ],
      winConfigKeys: ["win_url", "win_code"],
      /* 医院列表 */
      hospList: null,
      /* 自助机列表 */
      winCodeList: null,
      /* 机构ID */
      orgId: 0,
      /* 自助机ID */
      winConfigId: 0,
      /* 下载文件url */
      fileUri: "files/ROOT.zip",
      visible: false,
      count: 0,
      lastTime: null,
      // 显示日志
      showlog: false
    };
  },
  watch: {
    showInput(val) {
      val && (this.inputVal = "");
    },
    async visible() {
      if (this.visible) {
        this.$store.commit("isFullscreen", true);
        this.$isAutoLeave(false);
        this.hospList = await OrgConfigApi.getOrgList();
        this.storeOrgId && (this.orgId = this.storeOrgId);
      } else {
        this.$isAutoLeave(true);
        this.$store.commit("isFullscreen", false);
      }
    },
    async orgId(id) {
      this.winCodeList = await OrgConfigApi.getWinCodeList({ orgId: id }, { loading: false });
      if (this.storeWinConfigId && !this.hospInfo) {
        this.winConfigId = this.storeWinConfigId;
      } else if (id != 0) {
        if (Array.isArray(this.winCodeList) && this.winCodeList.length > 0) {
          this.winConfigId = this.winCodeList[0].id;
        } else {
          this.winConfigId = 0;
        }
      }
    },
    async winConfigId(id) {
      if (!id) return;
      this.hospInfo = await OrgConfigApi.getOrgWinconfigDetail({
        orgId: this.orgId,
        winConfigId: this.winConfigId
      });
    }
  },
  computed: {
    storeHospital() {
      return this.$store.state.common.hospital;
    },
    storeOrgId() {
      return this.$store.getters.getOrgId;
    },
    storeWinConfigId() {
      return this.$store.getters.getWinConfigId;
    },
    screenWidth: () => window.screen.width,
    screenHeight: () => window.screen.height
  },
  methods: {
    showExtDetail() {
      this.isShowExtDetail = !this.isShowExtDetail;
    },
    /* 显示维护界面 */
    async showSetup(e) {
      !this.lastTime && (this.lastTime = e.timeStamp);
      if (e.timeStamp - this.lastTime < 1000) {
        this.count++;
        if (this.count >= 5) {
          this.count = 0;
          this.showInput = true;
        }
      } else {
        this.count = 1;
      }
      this.lastTime = e.timeStamp;
    },
    /* 初始化机器 */
    async init() {
      if (!this.initVerify()) return;
      this.$store.commit("setHospital", this.hospInfo);
      const hardwareInfo = await WHTApi.getInfoByWinConfigId({ winConfigId: this.winConfigId });
      this.$store.commit("setHardWare", hardwareInfo);
      this.$emit("initSuccess", this.hospInfo);
      this.visible = false;
    },
    /* 初始化校验 */
    initVerify() {
      // 需要校验哪个字段往这个对象里加。
      const items = {
        win_code: this.hospInfo.winConfig.win_code,
        hosp_code: this.hospInfo.hosp_code
      };
      const fn = key => {
        if (items[key] === null) {
          showalert(`初始化失败<br>${key}为空`);
          return true;
        }
      };
      const keys = Object.keys(items);
      if (keys.some(fn)) return false;
      if (this.winConfigId == 0 || this.orgId == 0) {
        showalert("请选择医院");
        return false;
      }
      return true;
    },
    //清除缓存
    clearCache() {
      localStorage.clear();
      window.location.reload(true);
    },
    //下载文件
    openFile() {
      window.open(this.fileUri);
    },
    //获取键盘输入内容
    changePwd(content, num) {
      if (content == "close") {
        if (this.inputVal == this.$hospital.oper_pwd) {
          this.visible = true;
          this.showInput = false;
        } else {
          this.$bem.showalert("密码错误");
        }
      } else {
        this.inputVal = content;
        this.$refs.theInput.focus();
      }
    }
  }
};
</script>