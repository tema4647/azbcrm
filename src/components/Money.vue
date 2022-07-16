<template>
  <div class="money">
      <Basis >
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
                <MultiSelect v-model="selectedService" :options="SERVICE" optionLabel="service_name"  placeholder="Выберите услугу" />
              </div>
            </div>
  
            <div class="money__choice-ticket">
              
            </div>

          </div>
  
          <div class="money__pay">
            <Button label="На оплату" class="p-button-success" />
          </div>
        </div>
      </Basis>
    </div>
</template>

<script>
import Basis from "@/components/ui/Basis"

  export default {
    name: 'Money',
    components:{
      Basis
    },
    data(){
      return{
        
      }
    }
  }
</script>

<style lang="scss" scoped>
.money{
  width:100%;
  margin-top: 20px;
}

.money__wrapper{
  height: 100%;
  row-gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // border: 1px solid red;
  
}
.money__header {
display: flex;
justify-content: space-between;
// font-size: 16px;
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