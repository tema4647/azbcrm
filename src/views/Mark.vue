<template>
  <div class="mark" @click="closePopup">
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>

    <transition name="fade">
      <Popup :style="positionPopup" v-if="isPopup" @click="closePopup">
        <p class="popup__link" @click="cancelVisit">Отменить посещение {{ visit.visitClient }} {{ visit.visitDate }}
        </p>
      </Popup>
    </transition>


    <Teleport to="#app">
      <Transition name="fade">
        <ClientData v-if="isClientData" @closeClientData="closeClientData" :client="client" />
      </Transition>
    </Teleport>

    <!-- панель выбора  -->
    <SelectionList :groups="GROUPS" :individuals="INDIVIDUALS" :trials="TRIALS" :tabs="tabs" @select="selectItem" />


    <!-- таблица -->
    <MarkTable @openPaymentDialog="openPaymentDialog" @openClientData="openClientData" @toggleMark="toggleMark"
      @rightClick="rightClick" :group="group" :individual="individual"
      :currentGroupOrIndividual="currentGroupOrIndividual" :clients="CLIENTS">
    </MarkTable>

    <!-- диалог оплаты -->
    <transition name="fade">
      <FormBase v-if="isPaymentDialog" @closeDialog="closePaymentDialog">
        <template v-slot:header>
          {{ clientSet.client_child_fio }} {{ currentClientDeposit }}
        </template>
        <template v-slot:body>
          <FormInput v-model="currentClientAmount" lable="Сумма" type="number" placeholder="Введите сумму" />

        </template>
        <template v-slot:footer>
          <AppButton class="btn-rounded btn-empty" @click="closePaymentDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white" @click="savePayment">Оплатить</AppButton>
        </template>
      </FormBase>
    </transition>

   


  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"


import MarkTable from "@/components/MarkTable"
import SelectionList from "@/components/SelectionList"
import OverScreen from '@/components/ui/OverScreen'
import FormBase from '@/components/Form/FormBase'
import FormInput from '@/components/Form/FormInput'
import AppButton from '@/components/ui/AppButton.vue'
import ClientData from '@/components/ClientData.vue'
import Popup from '@/components/Popup/Popup.vue'
import FormSelect from '@/components/Form/FormSelect'





export default {
  name: 'Mark',
  components: {

    SelectionList,
    MarkTable,
    OverScreen,
    FormBase,
    AppButton,
    ClientData,
    FormInput,
    Popup,
    FormSelect
  },

  data() {
    return {
      isPopup: false,
      isClientData: false,
      isPaymentDialog: false,
      isOverScreen: false,
      client: null,
      currentGroupOrIndividual: {},
      group: {},
      individual: {},
      price: 500.00,
      currentClientAmount: 0.00,
      currentClientDeposit: 0.00,
      clientId: null,
      positionPopup: {
        position: 'fixed',
        left: 0,
        top: 0,
      },
      visit: {
        visitClient: '',
        visitDate: null,
      },


      // данные клиента
      clientSet: {
        client_child_fio: '',
        client_child_birth: null,
        client_parent_fio: '',
        client_parent_phone: null,
        client_parent_email: '',
        client_parent_amount: 0.00,
        group_id: null,
      },

      visitValue: {
        client_id: null,
        visit_date: ''
      },

      TRIALS: [
        {
          id: 1,
          client_name: 'Оборина В.С'
        },

        {
          id: 2,
          client_name: 'Галкин Е.В'
        },
      ],

      tabs: [
        {
          name: 'trials',
          icon: 'fa-solid fa-bullseye',
          size: 'lg',
        },
        {
          name: 'groups',
          icon: 'fa-solid fa-people-group',
          size: 'lg',
        },
        {
          name: 'individuals',
          icon: 'fa-solid fa-person',
          size: 'lg',
        },

      ]

    }

  },

  computed: {
    currentSumm() {
      const result = +this.currentClientDeposit + +this.currentClientAmount
      return result
    },

    ...mapGetters([
      "GROUPS",
      "CLIENTS",
      "VISITS",
      "INDIVIDUALS",
      "SERVICES",
      "TICKETS"
    ]),
  },

  methods: {

    cancelVisit() {
      alert('этот функционал еще не доработан')
    },

    closePopup() {
      this.isPopup = false
    },

    rightClick([client, cell, $event]) {
      this.visit.visitDate = cell.day
      this.visit.visitClient = client.client_child_fio
      this.isPopup = true
      this.positionPopup.left = $event.x + 'px'
      this.positionPopup.top = $event.y + 'px'
      console.log(cell);

    },

    // отметка посешения и списания денег со счета
    async toggleMark([client, cell, currentGroupOrIndividual]) {

      if (cell.isMarked) {
        alert('Повторная отметка посещения невозможна')
      } else {

        // проверяем есть ли абонементы у клиента 
        const [currentTickets] = client.tickets.lenght != 0 ? client.tickets : undefined
        // проверяем есть ли абонемент на услугу, если есть определяем стоимость списания по абонементу
        const currentTicketCost = currentTickets?.service_id == currentGroupOrIndividual.service_id ? currentTickets.visit_cost : undefined
        // определяем стоимость услуги в зависимости от груповых или индивидуальных занятий
        const [currentServiceCost] = 'group_name' in currentGroupOrIndividual ? client?.groups.map(group => group?.services.service_cost) : client?.individuals.map(individual => individual?.services.service_cost)
        // определяем текущую стоимость списания в зависимости есть ли абонемент или нет, если абонемент есть спишется стоимость по абонементу, если нет спишеться стоимость услуги.
        const currentValue = currentTicketCost ? currentTicketCost : currentServiceCost

        this.visitValue.client_id = client.id
        this.visitValue.visit_date = cell.day

        await this.$store.dispatch('SET_VISITS', this.visitValue)

        const result = client.client_parent_amount - currentValue

        this.clientId = client.id;
        this.clientSet.client_child_fio = client.client_child_fio;
        this.clientSet.client_child_birth = client.client_child_birth;
        this.clientSet.client_parent_fio = client.client_parent_fio;
        this.clientSet.client_parent_phone = client.client_parent_phone;
        this.clientSet.client_parent_email = client.client_parent_email;
        this.clientSet.client_parent_amount = result;
        const [group] = client.groups;
        this.clientSet.group_id = group.id;

        this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientSet])

        this.clientSet.client_child_fio = '';
        this.clientSet.client_child_birth = '';
        this.clientSet.client_parent_fio = '';
        this.clientSet.client_parent_phone = '';
        this.clientSet.client_parent_email = '';
        this.clientSet.group_id = '';

      }

    },

    // определение item в "SelectionList"
    selectItem([item]) {
      if ('group_name' in item) {
        this.currentGroupOrIndividual = item
        this.group = item
      } else if ('individual_name' in item) {
        this.currentGroupOrIndividual = item
        this.individual = item
      }
    },


    // открытие диалога оплаты
    openPaymentDialog(client) {
      this.clientId = client.id;
      this.clientSet.client_child_fio = client.client_child_fio;
      this.clientSet.client_child_birth = client.client_child_birth;
      this.clientSet.client_parent_fio = client.client_parent_fio;
      this.clientSet.client_parent_phone = client.client_parent_phone;
      this.clientSet.client_parent_email = client.client_parent_email;
      this.clientSet.client_parent_amount = client.client_parent_amount;
      const [group] = client.groups;
      this.clientSet.group_id = group.id;
      this.currentClientDeposit = client.client_parent_amount;

      this.isPaymentDialog = true
      this.isOverScreen = true
    },
    // закрытие диалога оплаты
    closePaymentDialog() {
      this.isPaymentDialog = false
      this.isOverScreen = false
    },

    savePayment() {
      this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientSet])
      this.clientSet.client_child_fio = '';
      this.clientSet.client_child_birth = '';
      this.clientSet.client_parent_fio = '';
      this.clientSet.client_parent_phone = '';
      this.clientSet.client_parent_email = '';
      this.clientSet.group_id = '';

      this.currentClientAmount = 0.00;
      this.currentClientDeposit = 0.00;

      this.isPaymentDialog = false
      this.isOverScreen = false

    },

    // открытие карточки клиента
    openClientData(client) {
      this.isClientData = true
      this.isOverScreen = true
      this.client = client
    },
    // закрытие карточки клиента
    closeClientData() {
      this.isClientData = false
      this.isOverScreen = false
    },

    ...mapActions([
      "GET_GROUPS",
      "GET_CLIENTS",
      "GET_VISITS",
      "GET_INDIVIDUALS",
      "GET_SERVICES",
      "GET_TICKETS"
    ]),

  },

  watch: {
    currentSumm() {
      // следим за изменением текушей суммы и добовляем в clientSet
      this.clientSet.client_parent_amount = this.currentSumm
    }
  },


  mounted() {
    this.GET_GROUPS()
    this.GET_CLIENTS()
    this.GET_VISITS()
    this.GET_INDIVIDUALS()
    this.GET_SERVICES()
    this.GET_TICKETS()
  },

}
</script>

<style lang="scss" scoped>
.popup__link {
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}


// анимация
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// общие
.mark {
  height: 100%;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 5px;
}
</style>