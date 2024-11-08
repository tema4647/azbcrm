<template>
  <AppBase>
    <div class="mark-table">
      <div class="mark-table__header">
        <span class="mark-table__header-group">{{ currentGroupOrIndividual.group_name ||
          currentGroupOrIndividual.individual_name }}</span>
        <div class="date-wrapper">
          <div class="date__arrow date__arrow-l" @click="monthPrevious"><font-awesome-icon
              :icon="['fas', 'caret-left']" /></div>
          <span class="date__month">{{ date.currentMonth }}</span>
          <div class="date__arrow date__arrow-r" @click="monthNext"><font-awesome-icon :icon="['fas', 'caret-right']" />
          </div>
        </div>
        <div class="mark-table__header-loc"></div>
      </div>


      <div class="longCard longCard-numbers">
        <span class="longCard__title"></span>
        <ul class="longCard__list">
          <li class="longCard__list-item longCard__list-item-numbers" v-for="date in allDatesMonth">
            {{ date.$D }}
          </li>
        </ul>
      </div>

      <div class="mark-table__table">
        <div v-for="client in filterClients" :key="client.id" class="longCard">

          <div class="longCard__info" v-if="client.client_parent_amount < 0" @mouseover="isInfo = true"
            @mouseout="isInfo = false">
            <div class="longCard__info-text">{{ client.client_parent_amount }}</div>
          </div>

          <span class="longCard__title" @click="handleClick2(client)">{{ client.client_child_fio }}</span>
          <ul class="longCard__list">
            <li class="longCard__list-item" @click.prevent.right="rightClick(client, cell, $event)"
              @dblclick="handleDblclick(client, cell, currentGroupOrIndividual )" v-for="cell in client.days" :key="cell.id">
              <span class="listItem__dot-mask" :class="{ listItem__dot: cell.isMarked }"></span>
            </li>
          </ul>
          <div class="moneyTrue" @click="handleClick(client)">
            <font-awesome-icon icon="fa-solid fa-credit-card" size="xs" />
          </div>
        </div>
      </div>



    </div>
  </AppBase>
</template>

<script>
import FormBase from '@/components/Form/FormBase'
import AppButton from '@/components/ui/AppButton.vue'
import OverScreen from '@/components/ui/OverScreen.vue'

import dayjs from 'dayjs'
import dayjs_ru from 'dayjs/locale/ru.js'

dayjs.locale('ru')

import AppBase from '@/components/ui/AppBase.vue'

export default {
  name: 'MarkTable',

  components: {
    AppBase,
    FormBase,
    AppButton,
    OverScreen,
  },

  props: {
    currentGroupOrIndividual: Object,
    group: Object,
    individual: Object,
    clients: Array
  },

  emits: ['openPaymentDialog', 'openClientData', 'toggleMark', 'rightClick'],
  data() {
    return {
      isInfo: false,
      date: {
        currentDate: dayjs(),
        currentMonth: dayjs().format('MMMM YYYY'),
        daysInMonth: dayjs().daysInMonth(),
        startOf: dayjs().startOf('month'),
      },
    }
  },

  computed: {
    // вычисляем все даты месяца
    allDatesMonth() {
      const days = []
      days.push(this.date.startOf)
      // добавляем все остальные дни месяца
      for (let i = 1; i <= this.date.daysInMonth - 1; i++) {
        days.push(this.date.startOf.add(1, 'day'))
        this.date.startOf = this.date.startOf.add(1, 'day')
      }
      return days
    },

    // добавляем дни месяца клиенту
    clientsWithDays() {
      const clientsWithDays = []
      for (let client of this.clients) {
        client.days = []
        this.allDatesMonth.forEach((day) => {
          client.days.push({
            day: day.format('YYYY-MM-DD'),
            isMarked: false
          })
        })
        // вычисляем отмеченые дни
        for (const visit of client.visits) {
          client.days.map((day) => {
            if (day.day == visit.visit_date) {
              day.isMarked = true
            }
            return day
          })
        }
        clientsWithDays.push(client)
      }
      return clientsWithDays
    },

    // фильтруем клиентов по группе или индивидуадьному занятиюf
    filterClients() {
      return this.clientsWithDays.filter((client) => {
        if ('group_name' in this.currentGroupOrIndividual) {
          for (let group of client.groups) {
            return group.group_name == this.currentGroupOrIndividual.group_name
          }
        }
        if ('individual_name' in this.currentGroupOrIndividual) {
          for (let individual of client.individuals) {
            return individual.individual_name == this.currentGroupOrIndividual.individual_name
          }
        }

      })
    }
  },

  methods: {
    monthNext() {
      this.date.currentDate = dayjs(this.date.currentDate).add(1, 'month')
      this.date.currentMonth = this.date.currentDate.format('MMMM YYYY')
      this.date.daysInMonth = dayjs(this.date.currentDate).daysInMonth()
      this.date.startOf = dayjs(this.date.currentDate).startOf('month')
    },

    monthPrevious() {
      this.date.currentDate = dayjs(this.date.currentDate).subtract(1, 'month')
      this.date.currentMonth = this.date.currentDate.format('MMMM YYYY')
      this.date.daysInMonth = dayjs(this.date.currentDate).daysInMonth()
      this.date.startOf = dayjs(this.date.currentDate).startOf('month')
    },

    handleClick(client) {
      this.$emit("openPaymentDialog", client)
    },

    handleClick2(client) {
      this.$emit("openClientData", client)
    },

    handleDblclick(client, cell, currentGroupOrIndividual) {
      this.$emit("toggleMark", [client, cell, currentGroupOrIndividual])
    },

    rightClick(client, cell, $event) {
      this.$emit("rightClick", [client, cell, $event])
    },

  },

}
</script>

<style lang="scss" scoped>
.mark-table__header {
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mark-table__header-group {
  font-size: 20px;
  font-weight: 500;
  flex: 0 1 33%;
  text-align: left;
}

.date-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.date__arrow {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.date__month {
  font-weight: 500;
  font-size: 21px;
  padding: 3px;
  flex: 0 1 auto;
  text-align: left;
  text-transform: capitalize;
}


.mark-table__header-loc {
  cursor: pointer;
  flex: 0 1 33%;
  text-align: left;
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

.longCard__info {
  width: 10px;
  height: 30px;
  background-color: rgb(255, 0, 0);
  position: absolute;
  left: 0;
  top: 0;
}

.longCard__info-text {
  width: 100px;
  height: 30px;
  background-color: white;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  transition: 1s all;
  transform: translateX(-100%);
}

.longCard__info:hover .longCard__info-text {
  transform: translateX(10px);
}



.longCard__title {
  width: 150px;
  font-size: 13px;
  font-weight: 500;
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
  position: relative;
}



.longCard__list-item:last-child {
  border-right: 1px solid rgb(212, 212, 212);
}

.moneyTrue {
  border-radius: 100%;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgb(221, 221, 221);
  padding: 3px;
  display: flex;
  column-gap: 10px;
  align-items: center;
  cursor: pointer;
}

.listItem__dot-mask {
  border-radius: 100%;
  width: 11px;
  height: 11px;
  background-color: rgb(247, 247, 247);
  pointer-events: none
}

.listItem__dot {
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