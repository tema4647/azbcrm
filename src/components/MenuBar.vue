<template>
  <div class="saidBar">
    <div class="saidBar__top">
      <ul class="nav__list-top">
        <li class="list__item">
          <router-link class="item__link" to="/">
            <!-- Класс "icon-border" приходит из global.css -->
            <div class="icon-border"><font-awesome-icon icon="fa-solid fa-border-all" size="xs" /></div>
            Дашборт
          </router-link>
        </li>
        <li class="list__item">
          <router-link class="item__link" to="/clients">
            <div class="icon-border"><font-awesome-icon icon="fa-solid fa-children" size="xs" /></div>
            Клиенты
          </router-link>
        </li>
        <li class="list__item">
          <router-link class="item__link" to="/groups">
            <div class="icon-border"><font-awesome-icon icon="fa-solid fa-people-group" size="xs" /></div>
            Группы
          </router-link>
        </li>
        <li class="list__item">
          <router-link class="item__link" to="/mark">
            <div class="icon-border"><font-awesome-icon icon="fa-solid fa-marker" size="xs" /></div>
            Журнал
          </router-link>
        </li>
        <li class="list__item">
          <router-link class="item__link" to="/tasks">
            <div class="icon-border"><font-awesome-icon icon="fa-solid fa-list-check" size="xs" /></div>
            Задачи
          </router-link>
        </li>
        <li class="list__item">
          <router-link class="item__link" to="/schedule">
            <div class="icon-border"><font-awesome-icon icon="fa-solid fa-calendar-days" size="xs" /></div>
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
  name: 'MenuBar',
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}

.saidBar {
  font-size: 18px;
  font-weight: 500;
  padding: 20px 10px;
  width: 200px;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #dddddd;
  background-color: var(--main-color);
}

.nav__list-top {
  display: flex;
  flex-direction: column;
  row-gap: 10px;

}

.nav__list-bottom {
  display: flex;
  justify-content: start;
  column-gap: 10px;
  padding: 9px 20px;

}

.list__item {
  width: 100%;
}

.list__item-bootom {
  width: 40px;
  height: 40px;
  padding: 20px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item__link-bottom {
  color: #ffffff;
}

.item__link {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 10px;
  padding: 9px 20px;
  border-radius: 5px;
  transition: .3s all;
  color: #ffffff;
}


.item__link:hover {
  background-color: #333d4b;
  transition: .3s all;
}


.router-link-exact-active> .icon-border {
  color: var(--icon-hover);
  transition: .3s all;
}
</style>