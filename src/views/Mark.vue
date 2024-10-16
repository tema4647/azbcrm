<template>
  <div class="mark" @click="closePopup">
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>

    <transition name="fade">
      <Popup :style="positionPopup" v-if="isPopup" @click="closePopup">
        <p class="popup__link" @click="cancelVisit">Отменить посещение {{ visit.visitClient }} {{ visit.visitDate }} </p>
      </Popup>
    </transition>


    <Teleport to="#app">
      <Transition name="fade">
        <ClientData v-if="isClientData" @closeClientData="closeClientData" :client="client" />
      </Transition>
    </Teleport>

    <!-- панель выбора  -->
    <SelectionList :groups="GROUPS" :trial="TRIAL" :individuals="INDIVIDUALS" :tabs="tabs" @select="selectItem" />

    <!-- таблица -->
    <MarkTable @openPaymentDialog="openPaymentDialog" @openClientData="openClientData" @toggleMark="toggleMark"
      @rightClick="rightClick" :group="group" :clients="CLIENTS">
    </MarkTable>

    <!-- диалог оплаты -->
    <transition name="fade">
      <FormBase v-if="isPaymentDialog" @closeDialog="closePaymentDialog">
        <template v-slot:header>
          {{clientSet.client_child_fio}}  {{ currentClientDeposit }}
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
    Popup
  },

  data() {
    return {
      isPopup: false,
      isClientData: false,
      isPaymentDialog: false,
      isOverScreen: false,
      client: null,
      group: '',
      price: 500.00,
      currentClientAmount: 0.00,
      currentClientDeposit: 0.00,
      clientId: null,
      positionPopup: {
        position: 'fixed',
        left: 0,
        top: 0,
      },
      visit:{
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

      INDIVIDUALS: [
        { id: 1, group_name: 'egoza' },
        { id: 2, group_name: 'xerox' },
        { id: 3, group_name: 'vrton' },
        { id: 4, group_name: 'melekot' },
      ],

      TRIAL: [
        { id: 1, group_name: '6', border_color: 'red' },
        { id: 2, group_name: '7', border_color: 'blue' },
        { id: 3, group_name: '8', border_color: 'green' },
        { id: 4, group_name: '9', border_color: 'yellow' },
      ],


      tabs: [
        {
          name: 'trial',
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
      "VISITS"
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
    async toggleMark([client, cell]) {
      if (cell.isMarked) {
        alert('Повторная отметка посещения невозможна')
      } else {
        this.visitValue.client_id = client.id
        this.visitValue.visit_date = cell.day

        await this.$store.dispatch('SET_VISITS', this.visitValue)

        const result = client.client_parent_amount - this.price;

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

    // определение группы в "SelectionList"
    selectItem(item) {
      this.group = item
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
      "GET_VISITS"
    ]),

  },

  watch: {
    currentSumm() {
      // следим за изменением текушей суммы и добовляем в clientSet
      this.clientSet.client_parent_amount = this.currentSumm
    }
  },


  mounted() {
    this.GET_GROUPS();
    this.GET_CLIENTS();
    this.GET_VISITS();
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