import storeCommon from '@/store/vuex.js'
import { info, warn, error } from '@/lib/logger/index.js'

export default {
  computed: {
    $nowTimeout() {
      return storeCommon.state.nowTimeout
    },
    $hospital() {
      return storeCommon.state.hospital
    },
    $orgId() {
      return this.$store.getters.getOrgId
    },
    $winConfigId() {
      return this.$store.getters.getWinConfigId
    }
  },
  methods: {
    $isAutoLeave(status) {
      this.$store.commit('isAutoLeave', status)
    },
    $info: data => info(data),
    $warn: data => warn(data),
    $error: data => error(data)
  }
}