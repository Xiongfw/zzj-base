<template>
  <div>
    <div class="bem-setup__trigger-btn" @click="showSetup"></div>
    <div v-if="visible" class="bem-setup bem--fullscreen">
      <div class="bem-setup__fun-wrap">
        <button class="bem-setup__btn bem-setup--shadow" @click="showlog = !showlog">显示日志</button>
        <button class="bem-setup__btn bem-setup--shadow" @click="clearCache">重置机器</button>
        <button class="bem-setup__btn bem-setup--shadow" @click="openFile()">下载文件</button>
      </div>
      <div class="bem-setup__select-wrap">
        <select v-model="orgId" class="bem-setup__select bem-setup--shadow">
          <option :value="0" v-show="orgId === 0">请选择医院</option>
          <option :value="item.id" v-for="item in hospList" :key="item.id">{{item.hosp_name}}</option>
        </select>
        <select v-model="winConfigId" class="bem-setup__select bem-setup--shadow">
          <option
            :value="0"
            v-show="winConfigId === 0"
          >{{Array.isArray(winCodeList) ? '数据为空' : '请选择机器编号'}}</option>
          <option :value="item.id" v-for="item in winCodeList" :key="item.id">{{item.win_code}}</option>
        </select>
      </div>
      <button class="bem-setup__init-btn bem-setup__btn bem-setup--shadow" @click="init">初始化机器</button>
      <div class="bem-setup__hr">当前医院配置信息</div>
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
      </ul>
    </div>
    <bem-logcat :show.sync="showlog"></bem-logcat>
  </div>
</template>

<script>
import logcat from "@/components/logcat/index";
import OrgConfigApi from "@/api/admin/OrgConfigApi";
import showalert from "@/components/alert/index";
export default {
  name: "BemSetup",
  mounted() {
    if (!this.storeHospital) {
      this.visible = true;
    }
  },
  components: {
    logcat
  },
  data() {
    return {
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
        "authorize_url",
        "serv_url",
        "gate_way"
      ],
      winConfigKeys: ["win_name", "win_url", "win_code"],
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
    async visible() {
      if (!this.visible) return;
      this.hospList = await OrgConfigApi.getOrgList();
      if (this.storeOrgId) {
        this.orgId = this.storeOrgId
      }
    },
    async orgId(id) {
      this.winCodeList = await OrgConfigApi.getWinCodeList(
        { orgId: id },
        { loading: false }
      );
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
      if (this.storeHospital && !this.hospInfo) {
        this.hospInfo = this.storeHospital;
      } else {
        this.hospInfo = await OrgConfigApi.getOrgWinconfigDetail({
          orgId: this.orgId,
          winConfigId: this.winConfigId
        });
      }
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
    }
  },
  methods: {
    /* 显示维护界面 */
    async showSetup(e) {
      !this.lastTime && (this.lastTime = e.timeStamp);
      if (e.timeStamp - this.lastTime < 500) {
        this.count++;
        if (this.count >= 5) {
          this.count = 0;
          this.hospList = await OrgConfigApi.getOrgList();
          this.visible = true;
        }
      }
      this.lastTime = e.timeStamp;
    },
    /* 初始化机器 */
    async init() {
      if (this.winConfigId == 0 || this.orgId == 0) {
        showalert("请选择医院");
        return;
      }
      this.$store.commit("setHospital", this.hospInfo);
      this.$emit("initSuccess", this.hospInfo);
      this.visible = false;
    },

    //清除缓存
    clearCache() {
      localStorage.clear();
      window.location.reload(true);
    },

    //下载文件
    openFile() {
      window.open(this.fileUri);
    }
  }
};
</script>