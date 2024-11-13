import axios from 'axios'

export default {
  state: {
    individuals: [],
  },

  mutations: {
    SET_INDIVIDUALS: (state, individuals) => {
      state.individuals = individuals
    },
    ADD_INDIVIDUAL: (state, data) => {
      state.individuals.unshift(data)
    },
    DELETE_INDIVIDUAL: (state, individualId) => {
      const index = state.individuals.findIndex(
          (individual) => individual.id == individualId
      )
      state.individuals.splice(index, 1)
  },
  },
  actions: {
    GET_INDIVIDUALS({ commit }) {
      return axios('http://127.0.0.1:8000/api/v1/individuals')
        .then((individuals) => {
          commit('SET_INDIVIDUALS', individuals.data)
          return individuals
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    SET_INDIVIDUALS({ commit }, individualsList) {
      return axios
        .post('http://127.0.0.1:8000/api/v1/individuals', {
          individual_name: individualsList.individualName,
          service_id: individualsList.service_id,
        })
        .then((individuals) => {
          commit('ADD_INDIVIDUAL', individuals.data)
        })
    },
    DELETE_INDIVIDUAL({ commit, state }, individualId) {
      return axios
        .delete(`http://127.0.0.1:8000/api/v1/individuals/${individualId}`)
        .then(() => {
          commit('DELETE_INDIVIDUAL', individualId)
        })
    },
  },
  getters: {
    INDIVIDUALS(state) {
      return state.individuals
    },
  },
}
