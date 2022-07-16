<template>
  <div class="saidBar">
    <div class="saidBar__top">
        <ul class="nav__list-top">
          <li class="list__item">
            <router-link class="item__link"  to="/">
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
          <li class="list__item">
            <router-link class="item__link" to="/mark">
            <i class="pi pi-user-edit"></i>
            Отмечалка
            </router-link>
          </li>
          <li class="list__item">
            <router-link class="item__link" to="/tasks">
            <i class="pi pi-bolt"></i>
            Задачи
            </router-link>
          </li>
          <li class="list__item">
            <router-link class="item__link" to="/schedule">
            <i class="pi pi-book"></i>
            Расписание
            </router-link>
          </li>
        </ul>
    </div>

    <div class="saidBar__bottom">
      <ul class="nav__list-bottom">
        <li class="list__item-bootom">
          <router-link class="item__link-bottom" to="/settings">
            <i class="pi pi-cog"></i>
          </router-link>
        </li>
        <li class="list__item-bootom">
          <router-link class="item__link-bottom" to="/analytics">
            <i class="pi pi-chart-bar"></i>
          </router-link>
        </li>
      </ul>

    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'SaidBar',
  }
</script>

<style lang="scss" scoped>
li {
  list-style:none;
}
.saidBar{
  font-size: 18px;
  font-weight: 500;
  padding: 20px 10px;
  width: 10%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right:1px solid #dddddd;
  background-color: #2e3743;
}
.nav__list-top{
display: flex;
flex-direction: column;
row-gap: 10px;

}
.nav__list-bottom{
  display: flex;
  justify-content: start;
  column-gap: 10px;
  padding: 9px 20px;

}
.list__item{
  width: 100%;
}

.list__item-bootom{
  width:40px;
  height: 40px;
  padding: 20px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item__link-bottom{
 color: #ffffff;
}

.item__link{
 width: 100%;
 display: flex;
 justify-content: start;
 align-items: center;
 column-gap:10px;
 padding: 9px 20px;
 border-radius: 30px;
 transition: .3s all;
 color: #ffffff;
}

.item__link:hover{
  background-color: #333d4b;
  transition: .3s all;
}

.list__item-bootom:hover{
  background-color: #333d4b;
  transition: .3s all;
}

.router-link-exact-active{
 color:#acacac;
}

.pi{
  font-size: 18px;
}

</style>