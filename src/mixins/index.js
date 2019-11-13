import { info, warn, error } from '@/lib/logger/index.js'
import { buildOpenUserID, isEmpty, toArray } from "@/utils/index.js"

export default {
  computed: {
    $nowTimeout() {
      return this.$store.state.common.nowTimeout
    },
    $hospital() {
      return this.$store.state.common.hospital
    },
    $hardware() {
      return this.$store.state.common.hardware
    },
    $orgId() {
      return this.$store.getters.getOrgId
    },
    $winConfigId() {
      return this.$store.getters.getWinConfigId
    },
    $deptId() {
      return this.$store.getters.getDeptId
    },
    $winCode() {
      return this.$store.getters.getWinCode
    },
    $extInfo() {
      return this.$store.getters.getExtInfo
    },
    $winExtInfo() {
      return this.$store.getters.getWinExtInfo
    },
    $openUserID() {
      return buildOpenUserID()
    }
  },
  methods: {
    $isEmpty(value) {
      return isEmpty(value)
    },
    $toArray(list) {
      return toArray(list)
    },
    $isAutoLeave(status) {
      this.$store.dispatch('isAutoLeave', status)
    },
    $info(data) {
      if (this.$options.name) {
        data = `[${this.$options.name}]${data}`
      }
      info(data)
    },
    $warn(data) {
      if (this.$options.name) {
        data = `[${this.$options.name}]${data}`
      }
      warn(data)
    },
    $error(data) {
      if (this.$options.name) {
        data = `[${this.$options.name}]${data}`
      }
      error(data)
    },
  }
}