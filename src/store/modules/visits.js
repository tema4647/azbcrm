import axios from 'axios'

export default {
  state:{
    visits:[]
  },

  mutations:{
    SET_VISITS:(state, visits)=>{
      state.visits=visits;
    },
    
    ADD_VISITS:(state, visit)=>{
      state.visits.unshift(visit);
    },

    DELETE_VISIT:(state, visitId)=>{
      const index = state.visits.findIndex(visit => visit.id == visitId);
      state.visits.splice(index, 1);
    }
  },

  actions:{
    GET_VISITS({commit}){
      return axios('http://127.0.0.1:8000/api/v1/visits')
      .then((visits)=>{
        commit('SET_VISITS', visits.data)
        return visits
      })
      .catch((error)=>{
        console.log(error)
        return error
      })
     },

     SET_VISITS({commit}, visitList ){
      return axios.post('http://127.0.0.1:8000/api/v1/visits', {
        client_id: visitList.client_id,
        visit_date: visitList.visit_date,
        service_id: visitList.service_id
      }
     )
     .then((visits) =>{
       commit('ADD_VISITS', visits.data)
      }
     )
   },

    DELETE_VISIT({commit, state} , visitId){
      return axios.delete(`http://127.0.0.1:8000/api/v1/groups/${visitId}`)
      .then(()=>{
        commit('DELETE_VISIT', visitId);
      })
    }
  },

  getters:{
    VISITS(state){
      return state.visits
    }
  }
}