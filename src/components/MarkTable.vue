<template>
  <AppBase>
    <div class="mark-table">
      <div class="mark-table__header">
        <span class="mark-table__header-group">Дошколята</span>
        <span class="mark-table__heder-month">Декабрь</span>
        <div class="mark-table__header-loc"></div>
      </div>


      <div class="longCard longCard-numbers">
        <span class="longCard__title"></span>
        <ul class="longCard__list">
          <li v-for="number in quantityDay" :key="number.id" class="longCard__list-item longCard__list-item-numbers">
            {{ number }}
          </li>
        </ul>
      </div>

      <div class="mark-table__table">
        <div v-for="card in cards" :key="card.id" class="longCard">
          <span class="longCard__title">{{ card.name }}</span>
          <ul class="longCard__list">
            <li 
            class="longCard__list-item"
            @dblclick="handlerDblclick" 
            v-for="cell in quantityDay" 
            :key="cell.id" 
            >
              <span class="listItem__dot-a"></span>
            </li>
          </ul>
          <div class="moneyTrue" @click="handlerClick"></div>
        </div>
      </div>
    </div>
  </AppBase>
</template>

<script>
import AppBase from '@/components/ui/AppBase.vue'

export default {
  name: 'MarkTable',
  components: {
    AppBase
  },
  props: {
    // cards:{
    //   type: Array,
    // }
  },
  data() {
    return {
      quantityDay: 30,
      cards: 10
    }
  },
  methods: {
    handlerClick() {
      this.$emit("openSidebar")
    },
    handlerDblclick(e){
      this.$emit("toggleMark", e.target)
    }

  }

}
</script>

<style lang="scss" scoped>
.mark-table {}

.mark-table__header {
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

}

.mark-table__header-group {
  font-size: 20px;
  font-weight: 500;

}

.mark-table__heder-month {
  font-weight: 500;
  font-size: 20px;
  border-bottom: 1px dashed black;
  cursor: pointer;
  padding: 3px;

}

.mark-table__header-loc {
  cursor: pointer;

}

.mark-table__table {
  width: 100%;
  height: calc(100% - 120px);
  overflow: auto;

}

.mark-table__table::-webkit-scrollbar {
  width: 0;

}

.longCard {
  width: 100%;
  height: 30px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  position: relative;
  margin-bottom: 5px;

}

.longCard::after {
  content: "";
  display: block;
  position: absolute;
  width: 10px;
  height: 100%;
  top: 0;
  left: 0;
  background-color: red;

}

.longCard__title {
  width: 150px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(75, 75, 75);
  margin-right: 30px;
  text-align: start;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

}

.longCard__list {
  display: flex;

}

.longCard__list-item {
  width: 30px;
  height: 40px;
  border-left: 1px solid rgb(212, 212, 212);
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;

}

.longCard__list-item:last-child {
  border-right: 1px solid rgb(212, 212, 212);

}

.moneyTrue {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  column-gap: 10px;
  align-items: center;
  background-color: rgb(53, 156, 122);
  cursor: pointer;

}

.listItem__dot-a{
  border-radius: 100%;
  width: 11px;
  height: 11px;
  background-color: rgb(247, 247, 247);
  pointer-events: none
}

.listItem__dot {
  // display: block;
  border-radius: 100%;
  width: 11px;
  height: 11px;
  background-color: green;

}

.longCard-numbers {
  background-color: #EDEDED;
}

.longCard-numbers::after {
  background-color: #EDEDED;

}

.longCard__list-item-numbers {
  border: none;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  height: 30px;

}

.longCard__list-item-numbers:last-child {
  border: none;

}
</style>