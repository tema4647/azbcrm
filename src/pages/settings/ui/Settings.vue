<template>
  <div class="settings">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>
    <!-- незабыть переписать selectionList в динамику, SelectionList2 временый вариант  -->
    <SelectionList2 :business="BUSINESS" @select="selectItem" />
    <!-- таблица -->
    <DataTable :headers="currentHeaders" :items="currentListItem" @deleteItem="openConfirmationDialog">
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

    <!-- диалог добавления группы в базу -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isSaveDialogGroups" @closeDialog="closeSaveDialog">
        <template #header>
          Добавить группу
        </template>
        <template #body>
          <FormInput v-model="groupsList.groupName" lable="Название группы" type="text"
            placeholder="Например, Радость" />
          <FormSelect v-model:select="selectedServicesForGroup" :options="SERVICES" optionFieldName="service_name"
            lable="Услуга" />
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="closeSaveDialog">Отменить</AppButton>
          <AppButton :disabled="groupsList.groupName && groupsList.serviceId ? false : true"
            class="btn-rounded btn-success text-white" @click.prevent="saveGroup">Сохранить</AppButton>
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
          <FormSelect v-model:select="selectedServicesForIndividual" :options="SERVICES" optionFieldName="service_name"
            lable="Услуга"></FormSelect>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
          <AppButton :disabled="!Object.values(individualsList).every(item => item)"
            class="btn-rounded btn-success text-white" @click.prevent="saveIndividual">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления группы из базы -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isDeleteGroupDialog" @closeDialog="closeConfirmationDialog">
        <template #header>
          Удалить группу
        </template>
        <template #body>
          <p style="font-size: 14px; line-height: 22px;">Вы действительно хотите удалить группу <strong
              style="font-size: 18px"> "{{ group.group_name }}" </strong> и все ее данные? <br>
            После удаления восстановить их будет невозможно.</p>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="closeConfirmationDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-danger text-white" @click.prevent="deleteGroup">Удалить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления преподавателя из базы -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isDeleteIndividualDialog" @closeDialog="closeConfirmationDialog">
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

    <!-- диалог удаления абонемента из базы -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isDeleteTicketDialog" @closeDialog="closeConfirmationDialog">
        <template #header>
          Удалить преподавателя
        </template>
        <template #body>
          <p style="font-size: 14px; line-height: 22px;">Вы действительно хотите удалить абонемент <strong
              style="font-size: 18px"> "{{ ticket.ticket_name }}" </strong> ? <br>
            После удаления восстановить его будет невозможно.</p>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="closeConfirmationDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-danger text-white" @click.prevent="deleteTicket">Удалить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления услуги из базы -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isDeleteServiceDialog" @closeDialog="closeConfirmationDialog">
        <template #header>
          Удалить услугу
        </template>
        <template #body>
          <p style="font-size: 14px; line-height: 22px;">Вы действительно хотите удалить услугу <strong
              style="font-size: 18px"> "{{ service.service_name }}" </strong> и все её абонементы ? <br>
            После удаления восстановить её(их) будет невозможно.</p>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="closeConfirmationDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-danger text-white" @click.prevent="deleteService">Удалить</AppButton>
        </template>
      </FormBase>
    </transition>
  </div>
</template>

<script>
import SelectionList2 from "@/widgets/SelectionList2"
import DataTable from "@/widgets/data-table/DataTable.vue"
import Search from '@/widgets/data-table/Search.vue'
import AppButton from '@/shared/ui/buttons/AppButton.vue'
import FormBase from '@/shared/ui/form/FormBase'
import OverScreen from '@/shared/ui/screen/OverScreen'
import FormInput from '@/shared/ui/form/FormInput'
import FormSelect from '@/shared/ui/form/FormSelect'



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
      isSaveDialogGroups: false,
      isSaveDialogIndividuals: false,
      isDeleteServiceDialog: false,
      isDeleteGroupDialog: false,
      isDeleteIndividualDialog: false,
      isDeleteTicketDialog: false,
      isOverScreen: false,
      selectedServicesForTicket: null,
      selectedServicesForIndividual: null,
      selectedServicesForGroup: null,
      service: null,
      ticket: null,
      group: null,
      individual: null,
      currentItem: 'Услуги',
      currentDeleteItem: null,

      servicesList: {
        serviceName: '',
        serviceCost: null,
      },

      ticketsList: {
        ticketName: '',
        service_id: null,
        ticketVisits: null,
        ticketDiscount: null,
        ticketCost: 0,
        visitCost: 0
      },

      groupsList: {
        groupName: "",
        serviceId: null
      },

      individualsList: {
        individualName: '',
        service_id: null,
      },


      // заголовки таблицы
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

      headersGroups: [
        {
          key: 'group_name',
          label: 'Группа'
        },
        {
          key: 'service_name',
          label: 'Услуга'
        },
        {
          key: 'quantity',
          label: 'Кол-во'
        },
      ],

      headersIndividuals: [
        {
          key: 'individual_name',
          label: 'Ф.И.О'
        },

      ],

      BUSINESS: [
        { id: 1, group_name: 'Услуги' },
        { id: 2, group_name: 'Абонементы' },
        { id: 3, group_name: 'Группы' },
        { id: 4, group_name: 'Индивидуалы' },
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

    // заголовки таблицы
    currentHeaders() {
      switch (this.currentItem) {
        case 'Услуги': return this.headersServices
        case 'Абонементы': return this.headersTickets
        case 'Группы': return this.headersGroups
        case 'Индивидуалы': return this.headersIndividuals
      }
    },

    // данные таблицы
    currentListItem() {
      switch (this.currentItem) {
        case 'Услуги': return this.SERVICES
        case 'Абонементы': return this.TICKETS
        case 'Группы': return this.GROUPS
        case 'Индивидуалы': return this.INDIVIDUALS
      }
    },

    ...mapGetters([
      'SERVICES',
      'TICKETS',
      'INDIVIDUALS',
      "GROUPS"
    ])
  },

  methods: {

    selectItem(item) {
      this.currentItem = item
    },

    saveService() {
      this.$store.dispatch('SET_SERVICES', this.servicesList)
      this.servicesList.serviceName = ''
      this.servicesList.serviceCost = null
      switch (this.currentItem) {
        case 'Услуги':
          this.isSaveDialogServices = false
          this.isOverScreen = false
          break
        case 'Абонементы':
          this.isSaveDialogTickets = false
          this.isOverScreen = false
          break
        case 'Группы':
          this.isSaveDialogGroups = false
          this.isOverScreen = false
          break
        case 'Индивидуалы':
          this.isSaveDialogIndividuals = false
          this.isOverScreen = false
          break
      }
    },

    saveTicket() {
      this.$store.dispatch('SET_TICKETS', this.ticketsList)
      this.ticketsList.ticketName = ''
      this.ticketsList.ticketVisits = null
      this.ticketsList.ticketDiscount = null
      this.ticketsList.ticketCost = 0
      this.ticketsList.visitCost = 0
      this.ticketsList.service_id = null
      this.selectedServicesForTicket = null
      switch (this.currentItem) {
        case 'Услуги':
          this.isSaveDialogServices = false
          this.isOverScreen = false
          break
        case 'Абонементы':
          this.isSaveDialogTickets = false
          this.isOverScreen = false
          break
        case 'Группы':
          this.isSaveDialogGroups = false
          this.isOverScreen = false
          break
        case 'Индивидуалы':
          this.isSaveDialogIndividuals = false
          this.isOverScreen = false
          break
      }
    },

    saveGroup() {
      if (this.groupsList.groupName !== '') {
        this.$store.dispatch("SET_GROUPS", this.groupsList)
        this.groupsList.groupName = ''
        this.groupsList.serviceId = null
        this.selectedServicesForGroup = null
        switch (this.currentItem) {
          case 'Услуги':
            this.isSaveDialogServices = false
            this.isOverScreen = false
            break
          case 'Абонементы':
            this.isSaveDialogTickets = false
            this.isOverScreen = false
            break
          case 'Группы':
            this.isSaveDialogGroups = false
            this.isOverScreen = false
            break
          case 'Индивидуалы':
            this.isSaveDialogIndividuals = false
            this.isOverScreen = false
            break
        }
      }
    },

    saveIndividual() {
      this.$store.dispatch('SET_INDIVIDUALS', this.individualsList)
      this.individualsList.individualName = ''
      this.individualsList.service_id = null
      this.selectedServicesForIndividual = null

      switch (this.currentItem) {
        case 'Услуги':
          this.isSaveDialogServices = false
          this.isOverScreen = false
          break
        case 'Абонементы':
          this.isSaveDialogTickets = false
          this.isOverScreen = false
          break
        case 'Группы':
          this.isSaveDialogGroups = false
          this.isOverScreen = false
          break
        case 'Индивидуалы':
          this.isSaveDialogIndividuals = false
          this.isOverScreen = false
          break
      }
    },

    openSaveDialog() {
      switch (this.currentItem) {
        case 'Услуги':
          this.isSaveDialogServices = true
          this.isOverScreen = true
          break
        case 'Абонементы':
          this.isSaveDialogTickets = true
          this.isOverScreen = true
          break
        case 'Группы':
          this.isSaveDialogGroups = true
          this.isOverScreen = true
          break
        case 'Индивидуалы':
          this.isSaveDialogIndividuals = true
          this.isOverScreen = true
          break
      }
    },

    closeSaveDialog() {
      switch (this.currentItem) {
        case 'Услуги':
          this.servicesList.serviceName = ''
          this.servicesList.serviceCost = null
          this.isSaveDialogServices = false
          this.isOverScreen = false
          break
        case 'Абонементы':
          this.ticketsList.ticketName = ''
          this.ticketsList.ticketVisits = null
          this.ticketsList.ticketDiscount = null
          this.ticketsList.ticketCost = 0
          this.ticketsList.visitCost = 0
          this.ticketsList.service_id = null
          this.selectedServicesForTicket = null
          this.isSaveDialogTickets = false
          this.isOverScreen = false
          break
        case 'Группы':
          this.groupsList.groupName = ''
          this.groupsList.serviceId = null
          this.selectedServicesForGroup = null
          this.isSaveDialogGroups = false
          this.isOverScreen = false
          break
        case 'Индивидуалы':
          this.individualsList.individualName = ''
          this.individualsList.service_id = null
          this.selectedServicesForIndividual = null
          this.isSaveDialogIndividuals = false
          this.isOverScreen = false
          break
      }
    },

    // открытие диалога подтверждения удаления 
    openConfirmationDialog(deleteItem) {
      this.currentDeleteItem = deleteItem
      if ('service_name' in deleteItem) {
        this.service = deleteItem
        this.isDeleteServiceDialog = true
        this.isOverScreen = true
      } else if ('ticket_name' in deleteItem) {
        this.ticket = deleteItem
        this.isDeleteTicketDialog = true
        this.isOverScreen = true
      } else if ('group_name' in deleteItem) {
        this.group = deleteItem
        this.isDeleteGroupDialog = true
        this.isOverScreen = true
      } else if ('individual_name' in deleteItem) {
        this.individual = deleteItem
        this.isDeleteIndividualDialog = true
        this.isOverScreen = true
      }
    },

    closeConfirmationDialog() {
      if ('service_name' in this.currentDeleteItem) {
        this.service = null
        this.isDeleteServiceDialog = false
        this.isOverScreen = false
      } else if ('ticket_name' in this.currentDeleteItem) {
        this.ticket = null
        this.isDeleteTicketDialog = false
        this.isOverScreen = false
      } else if ('group_name' in this.currentDeleteItem) {
        this.group = null
        this.isDeleteGroupDialog = false
        this.isOverScreen = false
      } else if ('individual_name' in this.currentDeleteItem) {
        this.individual = null
        this.isDeleteIndividualDialog = false
        this.isOverScreen = false
        console.log('individual')
      }
    },

    // удаление услуги из базы
    deleteService() {
      this.$store.dispatch("DELETE_SERVICE", this.service.id);
      this.currentDeleteItem = null
      this.isDeleteServiceDialog = false;
      this.isOverScreen = false;
    },

    // удаление группы из базы
    deleteGroup() {
      this.$store.dispatch("DELETE_GROUP", this.group.id);
      this.currentDeleteItem = null
      this.isDeleteGroupDialog = false;
      this.isOverScreen = false;
    },

    // удаление индивидуала из базы
    deleteIndividuals() {
      this.$store.dispatch("DELETE_INDIVIDUAL", this.individual.id);
      this.currentDeleteItem = null
      this.isDeleteIndividualDialog = false;
      this.isOverScreen = false;
    },
    // удаление абонемента из базы
    deleteTicket() {
      this.$store.dispatch("DELETE_TICKET", this.ticket.id);
      this.currentDeleteItem = null
      this.isDeleteTicketDialog = false;
      this.isOverScreen = false;
    },
    ...mapActions([
      'GET_SERVICES',
      'GET_TICKETS',
      'GET_INDIVIDUALS',
      'GET_GROUPS'
    ])
  },

  watch: {
    // следим за выбором услуги в абонементах
    selectedServicesForTicket() {
      this.ticketsList.service_id = this.selectedServicesForTicket?.id
    },

    // следим за выбором услуги в индивидуалах
    selectedServicesForIndividual() {
      this.individualsList.service_id = this.selectedServicesForIndividual?.id
    },

    // следим за выбором услуги в группе
    selectedServicesForGroup() {
      this.groupsList.serviceId = this.selectedServicesForGroup?.id
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
    this.GET_GROUPS();
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