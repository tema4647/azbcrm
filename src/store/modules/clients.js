import axios from 'axios'

export default {
  state:{
    clients:[]
  },
  mutations:{
    SET_CLIENTS:(state, clients)=>{
      state.clients=clients;
    },
    
    ADD_CLIENT:(state, id)=>{
      state.clients.unshift(id);
    },
    DELETE_CLIENT:(state, clientId)=>{
      const index = state.clients.findIndex(client => client.id == clientId);
      state.clients.splice(index, 1);
    }

  },
  actions:{
    GET_CLIENTS({commit}){
      return axios('http://127.0.0.1:8000/api/v1/clients')
      .then((clients)=>{
        commit('SET_CLIENTS', clients.data)
        return clients
      })
      .catch((error)=>{
        console.log(error)
        return error
      })
     },

     SET_CLIENTS({commit}, clientSet ){
      return axios.post('http://127.0.0.1:8000/api/v1/clients', {
        client_surname: clientSet.client_surname,
        client_name: clientSet.client_name,
        group_id: clientSet.group_id
      }
     )
     .then((clients) =>{
       commit('ADD_CLIENT', clients.data)
      }
     )
   },

    DELETE_CLIENT({commit, state} , clientId){
      return axios.delete(`http://127.0.0.1:8000/api/v1/clients/${clientId}`)
      .then(()=>{
       commit('DELETE_CLIENT', clientId);
      }
    )
  }

  },
  getters:{
   CLIENTS(state){
     return state.clients
   }
  }

}