<template>
  <div class="saidBar">
    <ul class="nav__list">
      <li class="list__item">
        <i class="iconSize pi pi-home"></i>
        <router-link class="item__link" to="/">
          Дашборт
        </router-link> 
      </li>
      <li class="list__item">
        <i class="pi pi-users"></i>
        <router-link class="item__link" to="/clients">
        Клиенты
        </router-link> 
      </li>
      <li class="list__item">
        <i class="pi pi-th-large"></i>
        <router-link class="item__link" to="/groups">
        Группы
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SaidBar'
    
  }
</script>

<style lang="scss" scoped>
.saidBar{
  font-size: 16px;
  font-weight: 500;
  padding: 20px 10px;
  width: 10%;
  height: 100vh;
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
  display: flex;
  column-gap:10px;
  padding: 10px;
  // cursor: pointer;
}
.list__item:hover{
  background-color: #F5F5F5;
  transition:.3s;
}


</style>