import storeCommon from '@/store/vuex.js'
import { info, warn, error } from '@/lib/logger/index.js'

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
    $winCode() {
      return this.$store.getters.getWinCode
    }
  },
  methods: {
    $isAutoLeave(status) {
      this.$store.dispatch('isAutoLeave', status)
    },
    $info: data => info(data),
    $warn: data => warn(data),
    $error: data => error(data)
  }
}