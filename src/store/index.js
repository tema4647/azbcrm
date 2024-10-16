import { createStore } from 'vuex'
import groups from '@/store/modules/groups'
import clients from '@/store/modules/clients'
import visits from '@/store/modules/visits'
import services from '@/store/modules/services'




export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    groups,
    clients,
    visits,
    services
  }
})
