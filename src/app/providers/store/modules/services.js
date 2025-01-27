import axios from 'axios'


export default {
    state: {
        services: [],
    },
    mutations: {
        SET_SERVICES: (state, services) => {
            state.services = services
        },

        ADD_SERVICE: (state, data) => {
            state.services.push(data)

        },
        UPDATE_SERVICE: (state, data) => {
            const index = state.services.findIndex( service => service.id == data.id)
            state.services[index] = data
        },
        DELETE_SERVICE: (state, serviceId) => {
            const index = state.services.findIndex(
                (service) => service.id == serviceId
            )
            state.services.splice(index, 1)
        },
    },
    actions: {
        GET_SERVICES({ commit }) {
            return axios('http://127.0.0.1:8000/api/v1/services')
                .then((services) => {
                    commit('SET_SERVICES', services.data)
                    return services
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },

        SET_SERVICES({ commit }, servicesList) {
            return axios
                .post('http://127.0.0.1:8000/api/v1/services', {
                    service_name: servicesList.serviceName,
                    service_cost: servicesList.serviceCost,
                })
                .then((services) => {
                    commit('ADD_SERVICE', services.data)
                })
        },

        PUT_SERVICE({ commit }, [serviceId, servicesList]) {
            return axios
                .put(`http://127.0.0.1:8000/api/v1/services/${serviceId}`, {
                    service_name: servicesList.serviceName,
                    service_cost: servicesList.serviceCost,
                    
                })
                .then((services) => {
                  commit('UPDATE_SERVICE', services.data)
                })
        },

        DELETE_SERVICE({ commit, state }, serviceId) {
            return axios
                .delete(`http://127.0.0.1:8000/api/v1/services/${serviceId}`)
                .then(() => {
                    commit('DELETE_SERVICE', serviceId)
                })
        },
    },
    getters: {
        SERVICES(state) {
            return state.services
        },
    },
}