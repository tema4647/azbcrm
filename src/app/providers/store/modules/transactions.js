import axios from 'axios'

export default {
  state:{
    transactions:[]
  },

  mutations:{
    SET_TRANSACTIONS:(state, transactions)=>{
      state.transactions=transactions;
    },
    
    ADD_TRANSACTIONS:(state, transaction)=>{
      state.transactions.unshift(transaction);
    },

    DELETE_TRANSACTION:(state, transactionId)=>{
      const index = state.transactions.findIndex(transaction => transaction.id == transactionId);
      state.transactions.splice(index, 1);
    }
  },

  actions:{
    GET_TRANSACTIONS({commit}){
      return axios('http://127.0.0.1:8000/api/v1/transactions')
      .then((transactions)=>{
        commit('SET_TRANSACTIONS', transactions.data)
        return transactions
      })
      .catch((error)=>{
        console.log(error)
        return error
      })
     },

     SET_TRANSACTIONS({commit}, transactionsList ){
      return axios.post('http://127.0.0.1:8000/api/v1/transactions', {
        client_id: transactionsList.client_id,
        transaction_type: transactionsList.transaction_type,
        transaction_reason: transactionsList.transaction_reason,
        transaction_account: transactionsList.transaction_account,
        transaction_amount: transactionsList.transaction_amount,
        transaction_date: transactionsList.transaction_date,
      }
     )
     .then((transactions) =>{
       commit('ADD_TRANSACTIONS', transactions.data)
      }
     )
   },

    DELETE_TRANSACTION({commit, state} , transactionId){
      return axios.delete(`http://127.0.0.1:8000/api/v1/transactions/${transactionId}`)
      .then(()=>{
        commit('DELETE_TRANSACTION', transactionId);
      })
    }
  },

  getters:{
    TRANSACTIONS(state){
      return state.transactions
    }
  }
}