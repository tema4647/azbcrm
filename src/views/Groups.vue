<template>
  <div class="groups">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>

    <!-- тулбар -->
    <Toolbar>
      <AppButton @click="openSaveDialog" class="btn-success btn-rounded text-white">Добавить</AppButton>
    </Toolbar>

    <!-- таблица с группами -->
    <DataTable :items="GROUPS" :headers="headers" @deleteGroup="openConfirmationDialog"></DataTable>

    <!-- диалог сохранения группы в базу -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isSaveDialog" @closeDialog="hideSaveDialog">
        <template v-slot:header>
          Добавить группу
        </template>
        <template v-slot:body>
          <FormInput v-model="groupValue" lable="Название группы" type="text" placeholder="Например, Радость">
          </FormInput>
        </template>
        <template v-slot:footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="hideSaveDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white" @click.prevent="saveGroup">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления группы из базы -->
    <transition name="fade">
      <FormBase class="baseDialogPlace" v-if="isDeleteDialog" @closeDialog="hideConfirmationDialog">
        <template v-slot:header>
          Удалить группу
        </template>
        <template v-slot:body>
          <p style="font-size: 14px; line-height: 22px;">Вы действительно хотите удалить группу <strong
              style="font-size: 18px"> "{{ group }}" </strong> и все ее данные? <br>
            После удаления восстановить их будет невозможно.</p>
        </template>
        <template v-slot:footer>
          <AppButton class="btn-rounded btn-success btn-empty" @click="hideConfirmationDialog">Отменить</AppButton>
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
import DataTable from '@/components/DataTable/DataTable.vue'
import TestTable from '@/components/DataTable/TestTable.vue'
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
    TestTable,
    AppButton,
    OverScreen
  },


  data() {
    return {
      isSaveDialog: false,
      isDeleteDialog: false,
      isOverScreen: false,
      groupValue: "",
      groupId: "",
      group: "",

      // заголовки столбцов таблицы
      headers: [
        {
          key: 'id',
          label: 'id'
        },

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
      this.isSaveDialog = true;
      this.isOverScreen = true;
    },

    // закрытие диалога сохранения группы
    hideSaveDialog() {
      this.isSaveDialog = false;
      this.isOverScreen = false;
    },

    // сохранение группы в базу
    saveGroup() {
      if (this.groupValue !== "") {
        this.$store.dispatch("SET_GROUPS", this.groupValue);
        this.isSaveDialog = false;
        this.isOverScreen = false;
        this.groupValue = "";
      }
    },

    // открытие диалога подтверждение удаления группы 
    openConfirmationDialog(group) {
      this.groupId = group.id
      this.group = group.group_name;
      this.isDeleteDialog = true;
      this.isOverScreen = true;
    },

    // закрытие диалога удаления группы
    hideConfirmationDialog() {
      this.isDeleteDialog = false;
      this.isOverScreen = false;
    },

    // удаление группы из базы
    deleteGroup() {
      this.$store.dispatch("DELETE_GROUP", this.groupId);
      this.isDeleteDialog = false;
      this.isOverScreen = false;
    },

    ...mapActions(["GET_GROUPS"]),
  },

  computed: {
    ...mapGetters(["GROUPS"]),
  },
  mounted() {
    this.GET_GROUPS();
  },

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
