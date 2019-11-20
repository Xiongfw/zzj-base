import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.org_config_url + 'printHistory/'

export default {
    /**
     * 查询打印历史
     */
    list(data, options = {}) {
        return axios({ method: 'get', url: baseUrl + 'list', data, options });
    },
    /**
     * 添加打印历史
     */
    add(params, options = {}) {
        return axios({ method: 'post', url: baseUrl + 'add', params, options });
    },
    /**
     * 删除打印历史
     */
    del(params, options = {}) {
        return axios({ method: 'get', url: baseUrl + 'del', params, options });
    },
}