<template>
  <div class="settings">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>
    <!-- незабыть переписать selectionList в динамику, SelectionList2 временый вариант  -->
    <SelectionList2 :system="SYSTEM" :business="BUSINESS" @select="selectItem" />
    <!-- таблица -->
    <DataTable :headers="currentHeaders" :items="currentListItem">
      <template #header>
        <AppButton class="btn-success btn-rounded text-white" @click="openSaveDialog">
          Добавить
        </AppButton>
        <Search placeholder="" />
      </template>
    </DataTable>

    <!-- диалог добавления услуги в базу -->
    <transition name="fade">
      <FormBase v-if="isSaveDialogServices" @closeDialog="closeSaveDialog">
        <template #header>
          Добавить услугу
        </template>
        <template #body>
          <FormInput lable="Название" type="text" v-model="servicesList.serviceName" />
          <FormInput lable="Стоимость" type="number" v-model="servicesList.serviceCost" />
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white" @click.prevent="saveService">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог добавления абонемента в базу -->
    <transition name="fade">
      <FormBase v-if="isSaveDialogTickets" @closeDialog="closeSaveDialog">
        <template #header>
          Создать абонемент
        </template>
        <template #body>
          <FormInput lable="Название" type="text" v-model="ticketsList.ticketName" />
          <FormSelect2 v-model:select="selectedServices" :options="SERVICES" lable="Услуга"></FormSelect2>
          <FormInput lable="Кол-во посещений" type="number" v-model="ticketsList.ticketVisits" />
          <FormInput lable="Дисконт, ₽ " type="number" v-model="ticketsList.ticketDiscount" />
          <div class="formResult-wrapper">
            <div class="formResult"><span>Стоимость абонемента</span><span class="formResult_number">{{
        computedTicketCost }}</span></div>
            <div class="formResult"><span>Стоимость занятия</span><span class="formResult_number">{{ computedVisitCost
                }}</span>
            </div>
          </div>


          <!-- <FormInput lable="Стоимость" type="number" v-model="ticketsList.ticketCost" /> -->


        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white" @click.prevent="saveTicket">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>
  </div>
</template>

<script>
import SelectionList2 from "@/components/SelectionList2"
import DataTable from "@/components/DataTable/DataTable.vue"
import Search from '@/components/DataTable/Search.vue'
import AppButton from '@/components/ui/AppButton.vue'
import FormBase from '@/components/Form/FormBase'
import OverScreen from '@/components/ui/OverScreen'
import FormInput from '@/components/Form/FormInput'
import FormSelect2 from '@/components/Form/FormSelect2'



import { mapGetters, mapActions } from 'vuex'



export default {
  name: 'Settings',
  components: {
    SelectionList2,
    DataTable,
    AppButton,
    Search,
    FormBase,
    OverScreen,
    FormInput,
    FormSelect2
  },

  data() {
    return {
      isSaveDialogTickets: false,
      isSaveDialogServices: false,
      isOverScreen: false,
      selectedServices: null,
      servicesList: {
        serviceName: '',
        serviceCost: 0,
      },

      ticketsList: {
        ticketName: '',
        service_id: 0,
        ticketVisits: 0,
        ticketDiscount: 0,
        ticketCost: 0,
        visitCost: 0
      },

      currentItem: 'Услуги',

      headersServices: [
        {
          key: 'service_name',
          label: 'Услуга'
        },
        {
          key: 'service_cost',
          label: 'Стоимость, ₽'
        },

      ],


      headersTickets: [
        {
          key: 'ticket_name',
          label: 'Абонемент'
        },
        {
          key: 'ticket_cost',
          label: 'Стоимость абонемента, ₽'
        },
        {
          key: 'visit_cost',
          label: 'Стоимость посещения, ₽'
        },
        {
          key: 'ticket_discount',
          label: 'Скидка, ₽'
        },
        {
          key: 'ticket_visits',
          label: 'Кол-во посещений'
        },

      ],

      BUSINESS: [
        { id: 1, group_name: 'Услуги' },
        { id: 2, group_name: 'Абонементы' },
      ],

      SYSTEM: [
        { id: 1, group_name: '6', border_color: 'red' },
        { id: 2, group_name: '7', border_color: 'blue' },
        { id: 3, group_name: '8', border_color: 'green' },
        { id: 4, group_name: '9', border_color: 'yellow' },
      ],

      // tabs: [
      //   {
      //     name: 'system',
      //     icon: 'fa-solid fa-gear',
      //     size: 'lg',
      //   },
      //   {
      //     name: 'business',
      //     icon: 'fa-solid fa-square-poll-horizontal',
      //     size: 'lg',
      //   },

      // ]

    }
  },
  computed: {

    computedTicketCost() {
      const currentServiceCost = this.SERVICES[this.ticketsList.service_id - 1]
      const ticketCost = (currentServiceCost?.service_cost * this.ticketsList.ticketVisits) - this.ticketsList.ticketDiscount
      return ticketCost ? ticketCost : currentServiceCost?.service_cost
    },

    computedVisitCost() {
      if (!this.ticketsList.ticketVisits) return undefined
      const currentVisitCost = this.computedTicketCost / this.ticketsList.ticketVisits
      return Math.round(currentVisitCost ? currentVisitCost : '')
    },

    currentListItem() {
      if (this.currentItem == 'Услуги') {
        return this.SERVICES
      } else {
        return this.TICKETS
      }
    },

    currentHeaders() {
      if (this.currentItem == 'Услуги') {
        return this.headersServices
      } else {
        return this.headersTickets
      }
    },

    ...mapGetters([
      'SERVICES',
      'TICKETS'
    ])
  },

  methods: {
    selectItem(item) {
      this.currentItem = item
    },


    saveService() {
      this.$store.dispatch('SET_SERVICES', this.servicesList)
      this.servicesList.serviceName = ''
      this.servicesList.serviceCost = 0
      if (this.currentItem == 'Услуги') {
        this.isSaveDialogServices = false
        this.isOverScreen = false

      } else {
        this.isSaveDialogTickets = false
        this.isOverScreen = false
      }

    },

    saveTicket() {
      this.$store.dispatch('SET_TICKETS', this.ticketsList)
      this.servicesList.serviceName = ''
      this.servicesList.serviceCost = 0
      this.servicesList.ticketCost = 0
      this.servicesList.ticketDiscount = 0
      this.servicesList.ticketVisits = 0
      this.servicesList.service_id = 0
      if (this.currentItem == 'Услуги') {
        this.isSaveDialogServices = false
        this.isOverScreen = false

      } else {
        this.isSaveDialogTickets = false
        this.isOverScreen = false
      }
    },

    openSaveDialog() {
      if (this.currentItem == 'Услуги') {
        this.isSaveDialogServices = true
        this.isOverScreen = true

      } else {
        this.isSaveDialogTickets = true
        this.isOverScreen = true
      }

    },

    closeSaveDialog() {
      if (this.currentItem == 'Услуги') {
        this.isSaveDialogServices = false
        this.isOverScreen = false

      } else {
        this.isSaveDialogTickets = false
        this.isOverScreen = false
      }
    },
    ...mapActions([
      'GET_SERVICES',
      'GET_TICKETS'
    ])
  },

  watch: {
    // следим за выбором услуги
    selectedServices() {
      // опциональная цепочка "?" 
      this.ticketsList.service_id = this.selectedServices?.id
    },

    // вычисляем стоимость абонемента исходя из стоимости услуги, кол-ва посещений, и дисконта
    computedTicketCost() {
      this.ticketsList.ticketCost = this.computedTicketCost
    },

    // вычисляем стоимость посещения по абонементу исходя из стоимости услуги, кол-ва посещений, и дисконта
    computedVisitCost() {
      this.ticketsList.visitCost = this.computedVisitCost
    }
  },
  mounted() {
    this.GET_SERVICES();
    this.GET_TICKETS();
  }
}
</script>

<style lang="scss" scoped>
.formResult-wrapper {
  margin-top: 40px;
}

.formResult {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #000000;
  border-bottom: 1px solid #ced4da;
  padding-bottom: 5px;
}

.formResult_number {
  font-size: 20px;
  font-weight: 500;
}

// анимация
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.settings {
  height: 100%;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 5px;
}
</style>