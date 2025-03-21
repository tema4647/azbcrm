import axios from 'axios'

export default {
  state: {
    clients: [],
  },
  mutations: {
    SET_CLIENTS: (state, clients) => {
      state.clients = clients
    },

    ADD_CLIENT: (state, data) => {
      state.clients.unshift(data)
    },
    UPDATE_CLIENT: (state, data) => {
      const index = state.clients.findIndex((client) => client.id == data.id)
      state.clients[index] = data
    },
    DELETE_CLIENT: (state, clientId) => {
      const index = state.clients.findIndex((client) => client.id == clientId)
      state.clients.splice(index, 1)
    },
  },
  actions: {
    GET_CLIENTS({ commit }) {
      return axios('http://127.0.0.1:8000/api/v1/clients')
        .then((clients) => {
          commit('SET_CLIENTS', clients.data)
          return clients
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },

    SET_CLIENTS({ commit }, clientsList) {
      return axios
        .post('http://127.0.0.1:8000/api/v1/clients', {
          client_child_fio: clientsList.client_child_fio,
          client_child_birth: clientsList.client_child_birth,
          client_parent_fio: clientsList.client_parent_fio,
          client_parent_phone: clientsList.client_parent_phone,
          client_parent_email: clientsList.client_parent_email,
          client_parent_amount: clientsList.client_parent_amount,
          group_id: clientsList.group_id,
          individual_id: clientsList.individual_id,
        })
        .then((clients) => {
          commit('ADD_CLIENT', clients.data)
        })
    },

    PUT_CLIENT({ commit }, [clientId, clientsList]) {

      return axios
        .put(`http://127.0.0.1:8000/api/v1/clients/${clientId}`, {
          client_child_fio: clientsList.client_child_fio,
          client_child_birth: clientsList.client_child_birth,
          client_parent_fio: clientsList.client_parent_fio,
          client_parent_phone: clientsList.client_parent_phone,
          client_parent_email: clientsList.client_parent_email,
          client_parent_amount: clientsList.client_parent_amount,
          individual_id: clientsList.individual_id,
          group_id: clientsList.group_id,
          ticket_id: clientsList.ticket_id,
          ticket_count: clientsList.ticket_count,
          ticket_current_amount: clientsList.ticket_current_amount,
          sync: clientsList.sync,
          detach: clientsList.detach
        })
        .then((clients) => {
          commit('UPDATE_CLIENT', clients.data)
        })
    },

    DELETE_CLIENT({ commit, state }, clientId) {
      return axios
        .delete(`http://127.0.0.1:8000/api/v1/clients/${clientId}`)
        .then(() => {
          commit('DELETE_CLIENT', clientId)
        })
    },
  },
  getters: {
    CLIENTS(state) {
      return state.clients
    },
  },
}
