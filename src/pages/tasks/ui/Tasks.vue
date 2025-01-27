<template>
  <AppBase>
    <div class="tasks">

      <div class="task__block">
        <div class="task__block-header">
          <div class="block-header__title">Запланировано</div>
        </div>
        <div class="task__block-body">
          <div class="block-body__item" v-for="item in 7" :key="item.id">

          </div>
        </div>
      </div>

      <div class="task__block">
        <div class="task__block-header">
          <div class="block-header__title">Задачи на сегодня</div>
        </div>

        <div class="task__block-body">
          <div class="block-body__item" v-for="item in 5" :key="item.id">
            <div class="item__header">
              <div class="item__name">Репетун Макар</div>
              <div class="item__date">28.02.2022 10:00</div>
            </div>
            <div class="item__body">
              <div class="item__title">Узнать почему пропускают? Узнать почему пропускают? </div>
            </div>
          </div>
        </div>
      </div>

      <div class="task__block">
        <div class="task__block-header">
          <div class="block-header__title">Задачи на завтра</div>
        </div>
        <div class="task__block-body">
          <div class="block-body__item" v-for="item in 3" :key="item.id">

          </div>
        </div>
      </div>

      <div class="task__block">
        <div class="task__block-header">
          <div class="block-header__title">Выполненные задачи</div>
        </div>
        <div class="task__block-body">
          <div class="block-body__item" v-for="item in 5" :key="item.id">

          </div>
        </div>
      </div>

      <div class="task__block">
        <div class="task__block-header">
          <div class="block-header__title">Просроченные задачи</div>
        </div>
        <div class="task__block-body">
          <div class="block-body__item" v-for="item in 10" :key="item.id">

          </div>
        </div>
      </div>
    </div>

  </AppBase>
</template>

<script>
import AppBase from '@/shared/ui/base/AppBase.vue'

export default {
  name: 'Tasks',
  components: {
    AppBase
  }

}
</script>

<style lang="scss" scoped>
.tasks {
  user-select: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 10px;

}

.task__block {
  // border: 1px solid rgb(209, 209, 209);
  flex: 0 1 25%;


}

.task__block-header {
  height: 50px;
  background-color: var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 5px;

}

.block-header__title {
  font-size: 16px;
  color: white;
}

.task__block-body {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  // padding: 5px;

}

.block-body__item {
  width: 100%;
  height: 70px;
  border: 1px solid rgb(209, 209, 209);
  cursor: grab;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  overflow: hidden;

}

.item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  // border: 1px solid red;


}

.item__name {}

.item__date {}

.item__body {
  text-align: left;

}

.item__title {
  font-size: 12px;

}
</style>