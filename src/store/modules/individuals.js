import axios from "axios"

export default {
    state:{
      individuals: []
    },

    mutations:{
        SET_INDIVIDUALS:(state, individuals)=>{
            state.individuals=individuals;
          },
    },
    actions:{
        GET_INDIVIDUALS({commit}){
            return axios('http://127.0.0.1:8000/api/v1/individuals')
            .then((individuals)=>{
              commit('SET_INDIVIDUALS', individuals.data)
              return individuals
            })
            .catch((error)=>{
              console.log(error)
              return error
            })
           },
    },
    getters:{
        INDIVIDUALS(state){
            return state.individuals
        }

    }
}