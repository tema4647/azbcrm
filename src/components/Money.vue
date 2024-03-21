<template>
  <div class="money">
      <AppBase>
        <slot></slot>
        <div class="money__wrapper">
          <div class="money__header">
            <div class="money__header-total">Баланс: 5100</div>
          </div>
              

          <div class="money__history">
            <div class="money__history-title">Поступления и списания</div>
            <div class="money__history-wrapper">
              <div class="money__history-transaction" v-for='transaction in 30' :key='transaction.id' >
                  <div class="money__history-date">27.08.2022</div>
                  <div>- - - - - - -  - - - - - </div>
                  <div class="money__history-amount">+3600</div>
              </div>
            </div>
          </div>
  
          <div class="wrapper-field">
            <div class="money__choice-service">
              <div class="field">
              </div>
            </div>
  
            <div class="money__choice-ticket">
              
            </div>

          </div>
  
          <div class="money__pay">
          </div>
        </div>
      </AppBase>
    </div>
</template>

<script>
import AppBase from '@/components/ui/AppBase.vue'

  export default {
    name: 'Money',
    components:{
      AppBase
    },
    data(){
      return{
        
      }
    }
  }
</script>

<style lang="scss" scoped>
.money{
  width: 100%;
  margin-top: 20px;
}

.money__wrapper{
  height: 100%;
  row-gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
}
.money__client-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}
.money__header {
display: flex;
justify-content: space-between;
}
.money__history {
  
}
.money__history-title{
font-size: 16px;
font-weight: 600;
margin-bottom: 3px;
}
.money__history-wrapper{
  padding: 10px;
  width: 100%;
  height:300px;
  border:1px solid rgb(211, 208, 208);
  overflow: auto;
}
.money__history-wrapper::-webkit-scrollbar{
  width: 0;
}
.money__history-transaction {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 5px;
}
.money__history-date {
}
.money__history-amount {
}
.money__choice-service {

}
.money__choice-ticket {

}
.money__pay {
  display: flex;
  justify-content: end;

}
.wrapper-field{
}
.field {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-bottom: 15px;
}


</style>