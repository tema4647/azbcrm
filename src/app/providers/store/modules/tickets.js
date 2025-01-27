import axios from 'axios'


export default {
    state: {
        tickets: [],
    },

    mutations: {
        SET_TICKETS: (state, tickets) => {
            state.tickets = tickets
        },

        ADD_TICKET: (state, data) => {
            state.tickets.unshift(data)

        },
        UPDATE_TICKET: (state, data) => {
            const index = state.tickets.findIndex( ticket => ticket.id == data.id)
            state.tickets[index] = data
        },
        DELETE_TICKET: (state, ticketId) => {
            const index = state.tickets.findIndex(
                (ticket) => ticket.id == ticketId
            )
            state.tickets.splice(index, 1)
        },
    },
    
    actions: {
        GET_TICKETS({ commit }) {
            return axios('http://127.0.0.1:8000/api/v1/tickets')
                .then((tickets) => {
                    commit('SET_TICKETS', tickets.data)
                    return tickets
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },

        SET_TICKETS({ commit }, ticketsList) {
            return axios
                .post('http://127.0.0.1:8000/api/v1/tickets', {
                    ticket_name: ticketsList.ticketName,
                    ticket_cost: ticketsList.ticketCost,
                    ticket_discount: ticketsList.ticketDiscount,
                    ticket_visits: ticketsList.ticketVisits,
                    service_id: ticketsList.service_id,
                    visit_cost: ticketsList.visitCost
                })
                .then((tickets) => {
                    commit('ADD_TICKET', tickets.data)
                })
        },

        PUT_TICKET({ commit }, [ticketId, ticketsList]) {
            return axios
                .put(`http://127.0.0.1:8000/api/v1/tickets/${ticketId}`, {
                    ticket_name: ticketsList.ticketName,
                    ticket_cost: ticketsList.ticketCost,
                    ticket_discount: ticketsList.ticketDiscount,
                    ticket_visits: ticketsList.ticketVisits,
                    service_id: ticketsList.service_id,
                    visit_cost: ticketsList.visitCost

                })
                .then((tickets) => {
                  commit('UPDATE_TICKET', tickets.data)
                })
        },

        DELETE_TICKET({ commit, state }, ticketId) {
            return axios
                .delete(`http://127.0.0.1:8000/api/v1/tickets/${ticketId}`)
                .then(() => {
                    commit('DELETE_TICKET', ticketId)
                })
        },
    },
    getters: {
        TICKETS(state) {
            return state.tickets
        },
    },
}