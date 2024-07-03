<template>
  <div class="mark">
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>


    <Teleport to="#app">
      <Transition name="fade">
        <ClientData v-if="isClientData" @closeClientData="closeClientData" :client="client" />
      </Transition>
    </Teleport>

    <!-- панель выбора  -->
    <SelectionList :groups="GROUPS" :trial="TRIAL" :individuals="INDIVIDUALS" :tabs="tabs" @select="selectItem" />

    <!-- таблица -->
    <MarkTable v-if="CLIENTS.length" @openPaymentDialog="openPaymentDialog" @openClientData="openClientData" @toggleMark="toggleMark"
      :group="group" :clients="CLIENTS" >
    </MarkTable>

    <!-- диалог оплаты -->
    <transition name="fade">
      <FormBase v-if="isPaymentDialog" @closeDialog="closePaymentDialog">
        <template v-slot:header>
          Оплатить услугу
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




export default {
  name: 'Mark',
  components: {

    SelectionList,
    MarkTable,
    OverScreen,
    FormBase,
    AppButton,
    ClientData,
    FormInput
  },

  data() {
    return {
      isClientData: false,
      isPaymentDialog: false,
      isOverScreen: false,
      quantityDay: 31,
      client: null,
      group: '',
      price: 500.00,
      currentClientAmount: 0.00,
      currentClientDeposit: 0.00,
      clientId: null,

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
      "CLIENTS"
    ]),
  },

  methods: {
    // отметка посешения и списания денег со счета
    toggleMark(client) {
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

      console.log(client);

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
      console.log(this.currentClientDeposit);

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

      console.log(this.currentSumm);
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
      "GET_CLIENTS"
    ]),

  },

  watch: {
    currentSumm() {
      // следим за изменением текушей суммы и добовляем в clientSet
      this.clientSet.client_parent_amount = this.currentSumm
      // console.log(this.currentSumm);
    }
  },


  mounted() {
    this.GET_GROUPS();
    this.GET_CLIENTS();
  },

}
</script>

<style lang="scss" scoped>
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