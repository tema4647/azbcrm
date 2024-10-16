<template>
  <div class="settings">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>
    <!-- незабыть переписать selectionList в динамику, SelectionList2 временый вариант  -->
    <SelectionList2 :tabs="tabs" :system="SYSTEM" :business="BUSINESS" />
    <!-- таблица -->
    <DataTable :headers="headers" :items="SERVICES">
      <template #header>
        <AppButton class="btn-success btn-rounded text-white" @click="openSaveDialog">
          Добавить
        </AppButton>
        <Search placeholder="" />
      </template>
    </DataTable>

    <!-- диалог добавления услуги в базу -->
    <transition name="fade">
      <FormBase v-if="isSaveDialog" @closeDialog="closeSaveDialog">
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
    FormInput
  },

  data() {
    return {
      isSaveDialog: false,
      isOverScreen: false,
      servicesList: {
        serviceName: '',
        serviceCost: 0,
      },

      headers: [
        {
          key: 'service_name',
          label: 'Услуга'
        },
        {
          key: 'service_cost',
          label: 'Стоимость'
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

      tabs: [
        {
          name: 'system',
          icon: 'fa-solid fa-gear',
          size: 'lg',
        },
        {
          name: 'business',
          icon: 'fa-solid fa-square-poll-horizontal',
          size: 'lg',
        },

      ]

    }
  },
  computed: {
    ...mapGetters([
      'SERVICES',
    ])
  },

  methods: {
    saveService(){
      this.$store.dispatch('SET_SERVICES', this.servicesList)
      this.servicesList.serviceName = ''
      this.servicesList.serviceCost = 0

      this.isSaveDialog = false
      this.isOverScreen = false

    },

    openSaveDialog() {
      this.isSaveDialog = true
      this.isOverScreen = true
    },

    closeSaveDialog() {
      this.isSaveDialog = false
      this.isOverScreen = false
    },
    ...mapActions([
        'GET_SERVICES'
      ])
  },

  mounted() {
    this.GET_SERVICES();
  }
}
</script>

<style lang="scss" scoped>
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