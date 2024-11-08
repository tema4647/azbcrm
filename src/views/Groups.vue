<template>
  <div class="groups">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>


    <!-- таблица с группами -->
    <DataTable :items="GROUPS" :headers="headers" @deleteItem="openConfirmationDialog">
      <template #header>
        <AppButton @click="openSaveDialog" class="btn-success btn-rounded text-white">Добавить</AppButton>
        <Search placeholder="Найти группу" />
      </template>
    </DataTable>

    <!-- диалог сохранения группы в базу -->
    <transition name="fade">
      <FormBase  class="baseDialogPlace" v-if="isSaveDialog" @closeDialog="closeSaveDialog">
        <template #header>
          Добавить группу
        </template>
        <template #body>
          <FormInput v-model="groupList.groupName" lable="Название группы" type="text"
            placeholder="Например, Радость" />
          <FormSelect v-model:select="selectedServices" :options="SERVICES" optionFieldName="service_name" lable="Услуга" />
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="closeSaveDialog">Отменить</AppButton>
          <AppButton :disabled="groupList.groupName && groupList.serviceId ? false : true"
            class="btn-rounded btn-success text-white" @click.prevent="saveGroup">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления группы из базы -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isDeleteDialog" @closeDialog="closeConfirmationDialog">
        <template #header>
          Удалить группу
        </template>
        <template #body>
          <p style="font-size: 14px; line-height: 22px;">Вы действительно хотите удалить группу <strong
              style="font-size: 18px"> "{{ group }}" </strong> и все ее данные? <br>
            После удаления восстановить их будет невозможно.</p>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="closeConfirmationDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-danger text-white" @click.prevent="deleteGroup">Удалить</AppButton>
        </template>
      </FormBase>
    </transition>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import FormBase from '@/components/Form/FormBase'
import FormInput from '@/components/Form/FormInput'
import FormSelect from '@/components/Form/FormSelect'
import DataTable from '@/components/DataTable/DataTable.vue'
import Search from '@/components/DataTable/Search.vue'
import AppButton from '@/components/ui/AppButton.vue'
import OverScreen from '@/components/ui/OverScreen.vue'

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Groups",
  components: {
    Toolbar,
    FormBase,
    FormInput,
    DataTable,
    AppButton,
    OverScreen,
    Search,
    FormSelect
  },


  data() {
    return {
      isSaveDialog: false,
      isDeleteDialog: false,
      isOverScreen: false,
      selectedServices: null,
      groupId: "",
      group: "",
      groupList: {
        groupName: "",
        serviceId: null
      },

      // заголовки столбцов таблицы
      headers: [
        {
          key: 'group_name',
          label: 'Группа'
        },
        {
          key: 'quantity',
          label: 'Кол-во'
        },

      ],

    };
  },

  methods: {

    // открытие диалога сохранения группы
    openSaveDialog() {
      this.groupList.groupName = ""
      this.groupList.serviceId = null
      this.selectedServices = null
      this.isSaveDialog = true
      this.isOverScreen = true
    },

    // закрытие диалога сохранения группы
    closeSaveDialog() {
      this.isSaveDialog = false
      this.isOverScreen = false
    },

    // сохранение группы в базу
    saveGroup() {
      if (this.groupList.groupName !== '') {
        this.$store.dispatch("SET_GROUPS", this.groupList)
        this.isSaveDialog = false
        this.isOverScreen = false
        this.groupList.groupName = ""
        this.groupList.serviceId = null
        this.selectedServices = null
      }
    },

    // открытие диалога подтверждения удаления группы 
    openConfirmationDialog(group) {
      this.groupId = group.id
      this.group = group.group_name
      this.isDeleteDialog = true
      this.isOverScreen = true
    },

    // закрытие диалога удаления группы
    closeConfirmationDialog() {
      this.isDeleteDialog = false;
      this.isOverScreen = false;
    },

    // удаление группы из базы
    deleteGroup() {
      this.$store.dispatch("DELETE_GROUP", this.groupId);
      this.isDeleteDialog = false;
      this.isOverScreen = false;
    },

    ...mapActions([
      "GET_GROUPS",
      "GET_SERVICES"
    ]),
  },

  computed: {
    ...mapGetters([
      "GROUPS",
      "SERVICES"
    ]),
  },

  mounted() {
    this.GET_GROUPS();
    this.GET_SERVICES();

  },

  watch: {
    selectedServices() {
      this.groupList.serviceId = this.selectedServices?.id
    }
  }

};
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

.groups {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
