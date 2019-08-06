<template>
  <div v-if="show" class="bem-logcat bem--fullscreen">
    <div class="bem-logcat__header">
      <img class="icon" src="../../../assets/imgs/logcat/refresh.png" @click="getAllByTimeAndLevel()" />
      <img class="icon" src="../../../assets/imgs/logcat/clear.png" @click="clearLog" />
      <img class="close" src="../../../assets/imgs/logcat/close-circle.png" @click="close" />
      <select v-model="selectedTime" class="bem-logcat__select">
        <option :value="item.value" v-for="item in timeOptions">{{ item.label }}</option>
      </select>
      <select v-model="selectedLevel" class="bem-logcat__select">
        <option :value="level.value" v-for="level in levelOptions">{{ level.label }}</option>
      </select>
    </div>
    <table v-if="logs" class="bem-logcat__main" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th class="create-time">时间</th>
          <th class="oper-id">操作人ID</th>
          <th class="oper-name">操作人姓名</th>
          <th class="desc">描述</th>
          <th class="unfold"></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!logs || logs.length == 0">
          <p class="empty">暂无日志</p>
        </template>
        <template v-for="log in logs">
          <tr @click="showContent(log)" :style="levelStyle(log.level)">
            <td class="create-time">{{ log.create_time }}</td>
            <td class="oper-id">{{ log.oper_id || '---'}}</td>
            <td class="oper-name">{{ log.oper_name || '---'}}</td>
            <td class="desc">{{ log.desc }}</td>
            <td class="unfold">
              <img v-if="!log.showContent" src="../../../assets/imgs/logcat/right.png" />
              <img v-else src="../../../assets/imgs/logcat/down.png" />
            </td>
          </tr>
          <ul v-if="log.showContent" class="desc-content" @click="showContent(log)">
            <li>
              <span class="label">时间</span>
              <span class="text">{{ log.create_time }}</span>
            </li>
            <li>
              <span class="label">类型</span>
              <span class="text">{{ log.type }}</span>
            </li>
            <li>
              <span class="label">等级</span>
              <span class="text">{{ log.level }}</span>
            </li>
            <li>
              <span class="label">描述</span>
              <span class="text">{{log.desc}}</span>
            </li>
            <li v-if="log.api_time">
              <span class="label">接口时间</span>
              <span class="text">{{ log.api_time }}</span>
            </li>
            <li v-if="log.url">
              <span class="label">接口地址</span>
              <span class="text">{{ log.url }}</span>
            </li>
            <li v-if="log.in_param">
              <span class="label">接口入参</span>
              <pre class="text">{{ log.in_param }}</pre>
            </li>
            <li v-if="log.out_param">
              <span class="label">接口出参</span>
              <pre class="text">{{ log.out_param }}</pre>
            </li>
            <li v-if="log.data">
              <span class="label">额外数据</span>
              <pre class="text" v-html="log.data"></pre>
            </li>
          </ul>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as logger from "@/lib/logger/index";
export default {
  name: "BemLogcat",
  data() {
    return {
      logs: null,
      selectedLevel: 0,
      levelOptions: [
        { label: "全部", value: 0 },
        { label: "info", value: "info" },
        { label: "warn", value: "warn" },
        { label: "error", value: "error" }
      ],
      selectedTime: "h",
      timeOptions: [
        { label: "一小时内", value: "h" },
        { label: "一天以内", value: "d" },
        { label: "全部", value: 0 }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.getAllByTimeAndLevel();
      }
    },
    selectedLevel(level) {
      this.getAllByTimeAndLevel(level, this.selectedTime);
    },
    selectedTime(unit) {
      this.getAllByTimeAndLevel(this.selectedLevel, unit);
    }
  },
  methods: {
    /** 清空日志 */
    clearLog() {
      this.$bem.showalert({
        content: "确定要清空所有日志吗？",
        showCancel: true,
        isAutoExit: false,
        onClose: confirm => {
          if (confirm) {
            logger.clear();
            this.getAllByTimeAndLevel()
          }
        }
      });
    },
    getAllByTimeAndLevel(level, timeUnit) {
      level = level || this.selectedLevel;
      timeUnit = timeUnit || this.selectedTime;
      this.$bem.loading.show();
      if (!timeUnit) {
        logger.getAll(res => {
          this.logs = level ? res.filter(item => item.level === level) : res;
          this.$bem.loading.close();
        });
      } else {
        logger.getAllByTime(
          res => {
            this.logs = level ? res.filter(item => item.level === level) : res;
            this.$bem.loading.close();
          },
          1,
          timeUnit
        );
      }
    },
    /** 关闭事件 */
    close() {
      this.$emit("update:show", false);
      this.logs = [];
    },
    /** 显示日志详细 */
    showContent(log) {
      this.$set(log, "showContent", !log.showContent);
    },
    levelStyle(level) {
      const colors = {
        info: "#67C23A",
        warn: "#E6A23C",
        error: "#F56C6C"
      };
      return {
        color: colors[level]
      };
    }
  }
};
</script>
