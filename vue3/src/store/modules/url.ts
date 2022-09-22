import storage, { StorageType } from '@/utils/storage'
import _config from '@/config';
const state = {
  urlConfig: {}
}
const getters = {

}

const mutations = {
  SETURLSTORAGE(state: any, data: any) {
    const url: any = _config
    const config = url.urlConfig
    for (const i in data) {
      // 如果配置里需要存当前链接上的内容，则根据type存下
      if (config[i]) {
        let type = StorageType.session
        if (config[i].type === 'local') {
          type = StorageType.local
        } else if (config[i].type === 'cookie') {
          type = StorageType.cookie
        }
        storage.rcSetItem(type, i, data[i])
      }
    }
    state.urlConfig = data
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
