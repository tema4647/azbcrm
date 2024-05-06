<template>
  <div class="mark">
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>


    <Teleport to="#app">
      <Transition name="fade">
        <ClientData v-if="isClientData" @closeClientData="closeClientData" />
      </Transition>
    </Teleport>

    <!-- панель выбора  -->
    <SelectionList :groups="GROUPS" :trial="TRIAL" :individuals="INDIVIDUALS" :tabs="tabs" @select="selectItem" />

    <!-- таблица -->
    <MarkTable @openPaymentDialog="openPaymentDialog" @openClientData="openClientData" @toggleMark="toggleMark"
      :group="group" :clients="CLIENTS" />


    <!-- диалог оплаты -->
    <transition name="fade">
      <FormBase v-if="isPaymentDialog" @closeDialog="closePaymentDialog">
        <template v-slot:header>
          Оплатить услугу
        </template>
        <template v-slot:body>

        </template>
        <template v-slot:footer>
          <AppButton class="btn-rounded btn-empty" @click="closePaymentDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white">Оплатить</AppButton>
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
    ClientData
  },

  data() {
    return {
      isClientData: false,
      isPaymentDialog: false,
      isOverScreen: false,
      quantityDay: 31,
      group: '',

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

  methods: {
    toggleMark(toggleMark) {
      toggleMark.event.firstElementChild.classList.toggle('listItem__dot');
    },

    selectItem(item) {
      this.group = item
      // console.log(item);
    },

    openClientData() {
      this.isClientData = true
      this.isOverScreen = true
    },

    openPaymentDialog() {
      this.isPaymentDialog = true
      this.isOverScreen = true
    },

    closePaymentDialog() {
      this.isPaymentDialog = false
      this.isOverScreen = false
    },

    closeClientData() {
      this.isClientData = false
      this.isOverScreen = false
    },

    ...mapActions([
      "GET_GROUPS",
      "GET_CLIENTS"
    ]),

  },

  computed: {
    ...mapGetters([
      "GROUPS",
      "CLIENTS"
    ]),
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