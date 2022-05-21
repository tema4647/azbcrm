<template>
  <div class="saidBar">
    <ul class="nav__list">
      <li class="list__item">
        <router-link class="item__link" to="/">
        <i class="iconSize pi pi-home"></i>
        <span>Дашборт</span>
        </router-link> 
      </li>
      <li class="list__item">
        <router-link class="item__link" to="/clients">
        <i class="pi pi-users"></i>
        Клиенты
        </router-link> 
      </li>
      <li class="list__item">
        <router-link class="item__link" to="/groups">
        <i class="pi pi-align-justify"></i>
        Группы
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SaidBar',
    data(){
      return{
        
      }
    },
    methods:{
      
    }

    
  }
</script>

<style lang="scss" scoped>
.saidBar{
  font-size: 16px;
  font-weight: 500;
  padding: 20px 10px;
  width: 10%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  border-right:1px solid #dddddd;
  background-color: #fff;
}
.nav__list{
display: flex;
flex-direction: column;
}
.list__item{
  width: 100%;
}

.item__link{
 width: 100%;
 display: flex;
 justify-content: start;
 align-items: center;
 column-gap:10px;
 padding: 10px;
}
.item__link:hover{
  background-color: #F5F5F5;
  transition:.3s;
}
.pi{
  font-size: 18px;
}


</style>