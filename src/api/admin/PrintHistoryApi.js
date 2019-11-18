import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.org_config_url + 'printHistory/'

export default {
    /**
     * 查询打印历史
     */
    list(params, options = {}) {
        return axios({ method: 'get', url: baseUrl + 'list', params, options });
    },
    /**
     * 添加打印历史
     */
    add(params, options = {}) {
        return axios({ method: 'get', url: baseUrl + 'add', params, options });
    },
    /**
     * 删除打印历史
     */
    del(params, options = {}) {
        return axios({ method: 'get', url: baseUrl + 'del', params, options });
    },
}