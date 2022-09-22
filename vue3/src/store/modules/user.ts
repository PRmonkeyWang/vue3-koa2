
/* eslint-disable */
import { removeToken } from '@/utils/cookies'
import router from '@/router'

const state = {

}
const getters = {

}

const mutations = {

}

const actions = {
  async loginOut({ commit }: any) {
    removeToken();
    router.push({
      path: '/login'
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
