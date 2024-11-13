<template>
  <div class="settings">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>
    <!-- незабыть переписать selectionList в динамику, SelectionList2 временый вариант  -->
    <SelectionList2 :business="BUSINESS" @select="selectItem" />
    <!-- таблица -->
    <DataTable :headers="currentHeaders" :items="currentListItem" @deleteItem="openDeleteIndividualsDialog">
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
          <AppButton :disabled="!Object.values(servicesList).every(item => item)"
            class="btn-rounded btn-success text-white" @click.prevent="saveService">Сохранить</AppButton>
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
          <FormInput lable="Название абонемента" type="text" v-model="ticketsList.ticketName" />
          <FormSelect v-model:select="selectedServicesForTicket" :options="SERVICES" optionFieldName="service_name"
            lable="Услуга"></FormSelect>
          <FormInput lable="Кол-во посещений" type="number" v-model="ticketsList.ticketVisits" />
          <FormInput lable="Дисконт, ₽ " type="number" v-model="ticketsList.ticketDiscount" />
          <div class="formResult-wrapper">
            <div class="formResult"><span>Стоимость абонемента</span><span class="formResult_number">{{
                computedTicketCost }}</span></div>
            <div class="formResult"><span>Стоимость занятия</span><span class="formResult_number">{{ computedVisitCost
                }}</span>
            </div>
          </div>


        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
          <AppButton :disabled="!Object.values(ticketsList).every(item => item)"
            class="btn-rounded btn-success text-white" @click.prevent="saveTicket">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог добавления преподавателя в базу -->
    <transition name="fade">
      <FormBase v-if="isSaveDialogIndividuals" @closeDialog="closeSaveDialog">
        <template #header>
          Добавить преподавателя
        </template>
        <template #body>
          <FormInput lable="Ф.И.О" type="text" v-model="individualsList.individualName" />
          <FormSelect v-model:select="selectedServicesForIndividuals" :options="SERVICES" optionFieldName="service_name"
            lable="Услуга"></FormSelect>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
          <AppButton :disabled="!Object.values(individualsList).every(item => item)"
            class="btn-rounded btn-success text-white" @click.prevent="saveIndividual">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления преподавателя из базы -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isDeleteIndividualsDialog" @closeDialog="closeConfirmationDialog">
        <template #header>
          Удалить преподавателя
        </template>
        <template #body>
          <p style="font-size: 14px; line-height: 22px;">Вы действительно хотите удалить преподавателя <strong
              style="font-size: 18px"> "{{ individual.individual_name }}" </strong> и все ее данные? <br>
            После удаления восстановить их будет невозможно.</p>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="closeConfirmationDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-danger text-white" @click.prevent="deleteIndividuals">Удалить</AppButton>
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
import FormSelect from '@/components/Form/FormSelect'



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
    FormSelect
  },

  data() {
    return {
      isSaveDialogTickets: false,
      isSaveDialogServices: false,
      isSaveDialogIndividuals: false,
      isDeleteIndividualsDialog: false,

      isOverScreen: false,
      selectedServicesForTicket: null,
      selectedServicesForIndividuals: null,
      individual: null,
      servicesList: {
        serviceName: '',
        serviceCost: 0,
      },

      individualsList: {
        individualName: '',
        service_id: null,
      },

      ticketsList: {
        ticketName: '',
        service_id: null,
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

      headersindividuals: [
        {
          key: 'individual_name',
          label: 'Ф.И.О'
        },

      ],

      BUSINESS: [
        { id: 1, group_name: 'Услуги' },
        { id: 2, group_name: 'Абонементы' },
        { id: 3, group_name: 'Преподаватели' },
      ],



      // tabs: [
      //   {
      //     name: 'business',
      //     icon: 'fa-solid fa-square-poll-horizontal',
      //     size: 'lg',
      //   }
      // ]

    }
  },
  computed: {

    computedTicketCost() {
      const currentService = this.SERVICES.find(service => service.id == this.ticketsList.service_id)
      const ticketCost = (currentService?.service_cost * this.ticketsList.ticketVisits) - this.ticketsList.ticketDiscount
      return ticketCost ? ticketCost : currentService?.service_cost
    },



    computedVisitCost() {
      if (!this.ticketsList.ticketVisits) return undefined
      const currentVisitCost = this.computedTicketCost / this.ticketsList.ticketVisits
      return Math.round(currentVisitCost ? currentVisitCost : '')
    },

    currentListItem() {
      if (this.currentItem == 'Услуги') {
        return this.SERVICES
      } else if (this.currentItem == 'Абонементы') {
        return this.TICKETS
      } else {
        return this.INDIVIDUALS

      }
    },

    currentHeaders() {
      if (this.currentItem == 'Услуги') {
        return this.headersServices
      } else if (this.currentItem == 'Абонементы') {
        return this.headersTickets
      } else {
        return this.headersindividuals
      }
    },

    ...mapGetters([
      'SERVICES',
      'TICKETS',
      'INDIVIDUALS'
    ])
  },

  methods: {

    openDeleteIndividualsDialog(individual) {
      this.individual = individual
      this.isDeleteIndividualsDialog = true
    },

    
    // удаление преподавателя из базы

    deleteIndividuals() {
      this.$store.dispatch("DELETE_INDIVIDUAL", this.individual.id);
      this.isDeleteIndividualsDialog = false;
      this.isOverScreen = false;
    },


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

    saveIndividual() {
      this.$store.dispatch('SET_INDIVIDUALS', this.individualsList)
      this.individualsList.individualName = ''
      this.individualsList.service_id = null
      if (this.currentItem == 'Услуги') {
        this.isSaveDialogServices = false
        this.isOverScreen = false

      } else if (this.currentItem == 'Абонементы') {
        this.isSaveDialogTickets = false
        this.isOverScreen = false
      } else {
        this.isSaveDialogIndividuals = false
        this.isOverScreen = false
      }
    },

    saveTicket() {
      this.$store.dispatch('SET_TICKETS', this.ticketsList)

      this.ticketsList.ticketCost = 0
      this.ticketsList.ticketDiscount = 0
      this.ticketsList.ticketVisits = 0
      this.ticketsList.service_id = null
      this.selectedServices = null
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

      } else if (this.currentItem == 'Абонементы') {
        this.isSaveDialogTickets = true
        this.isOverScreen = true
      } else {
        this.isSaveDialogIndividuals = true
        this.isOverScreen = true
      }

    },

    closeSaveDialog() {
      if (this.currentItem == 'Услуги') {
        this.servicesList.serviceName = ''
        this.servicesList.serviceCost = 0

        this.isSaveDialogServices = false
        this.isOverScreen = false

      } else if(this.currentItem == 'Абонементы') {
        this.ticketsList.ticketCost = 0
        this.ticketsList.ticketDiscount = 0
        this.ticketsList.ticketVisits = 0
        this.ticketsList.service_id = null
        this.selectedServices = null

        this.isSaveDialogTickets = false
        this.isOverScreen = false
      }else {
        this.isSaveDialogIndividuals = false
        this.isOverScreen = false
      }
    },
    ...mapActions([
      'GET_SERVICES',
      'GET_TICKETS',
      'GET_INDIVIDUALS'
    ])
  },

  watch: {
    // следим за выбором услуги в абонементах
    selectedServicesForTicket() {
      // опциональная цепочка "?" 
      this.ticketsList.service_id = this.selectedServicesForTicket?.id
    },

    // следим за выбором услуги в преподавателях
    selectedServicesForIndividuals() {
      // опциональная цепочка "?" 
      this.individualsList.service_id = this.selectedServicesForIndividuals?.id
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
    this.GET_INDIVIDUALS();
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