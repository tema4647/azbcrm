import axios from 'axios'

export default {
  state:{
    groups:[]
  },

  mutations:{
    SET_GROUPS:(state, groups)=>{
      state.groups=groups;
    },
    
    ADD_GROUP:(state, group_name)=>{
      state.groups.push(group_name);
    },
    DELETE_GROUP:(state, groupId)=>{
      const index = state.groups.findIndex(group => group.id == groupId);
      state.groups.splice(index, 1);
    }
  },

  actions:{
    GET_GROUPS({commit}){
      return axios('http://127.0.0.1:8000/api/v1/groups')
      .then((groups)=>{
        commit('SET_GROUPS', groups.data)
        return groups
      })
      .catch((error)=>{
        console.log(error)
        return error
      })
     },

     SET_GROUPS({commit}, groupValue ){
      return axios.post('http://127.0.0.1:8000/api/v1/groups', {
       group_name: groupValue
      }
     )
     .then((groups) =>{
       commit('ADD_GROUP', groups.data)
      }
     )
   },

    DELETE_GROUP({commit, state} , groupId){
      return axios.delete(`http://127.0.0.1:8000/api/v1/groups/${groupId}`)
      .then(()=>{
        commit('DELETE_GROUP', groupId);
      })
    }
  },

  getters:{
    GROUPS(state){
      return state.groups
    }
  }
}