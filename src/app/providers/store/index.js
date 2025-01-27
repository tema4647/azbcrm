import { createStore } from 'vuex'
import groups from '@/app/providers/store/modules/groups'
import clients from '@/app/providers/store/modules/clients'
import visits from '@/app/providers/store/modules/visits'
import services from '@/app/providers/store/modules/services'
import tickets from '@/app/providers/store/modules/tickets'
import individuals from '@/app/providers/store/modules/individuals'
import transactions from '@/app/providers/store/modules/transactions'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    groups,
    clients,
    visits,
    services,
    tickets,
    individuals,
    transactions,
  },
})
