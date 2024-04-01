<template>
  <div class="clients">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>

    <!-- тулбар -->
    <Toolbar>
      <AppButton class="btn-success btn-rounded text-white" @click="openSaveDialog">
        Добавить
      </AppButton>
    </Toolbar>

    <!-- таблица -->
    <DataTable :items="CLIENTS" :headers="headers" @deleteItem="openConfirmationDialog"></DataTable>

    <!-- диалог добавления клиента в базу -->
    <transition name="fade">
      <FormBase v-if="isSaveDialog" @closeDialog="closeSaveDialog">
        <template v-slot:header>
          Добавить клиента
        </template>
        <template v-slot:body>
          <FormInput v-model="clientSet.client_name" lable="Имя" type="text" placeholder="Например, Василёк">
          </FormInput>
          <FormInput v-model="clientSet.client_surname" lable="Фамилия" type="text" placeholder="Например, Косичкин"></FormInput>
          <FormSelect v-model:select="selectedGroups" :options="GROUPS" lable="Группа"></FormSelect>
        </template>
        <template v-slot:footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white" @click.prevent="saveClient">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления клиента из базы -->
    <FormBase v-if="isDeleteDialog" @closeDialog="closeConfirmationDialog">
      <template v-slot:header>
        Удалить клиента
      </template>
      <template v-slot:body>
        <p class="dialogText">Вы уверены что хотите удалить <strong class="capitalize">{{ client }}</strong> из списка ?
        </p>
      </template>
      <template v-slot:footer>
        <AppButton class="btn-empty" @click.prevent="closeConfirmationDialog">Отменить</AppButton>
        <AppButton class="btn-rounded btn-danger text-white" @click.prevent="deleteClient">Удалить</AppButton>
      </template>
    </FormBase>
  </div>
</template>

<script>
import FormBase from '@/components/Form/FormBase'
import FormInput from '@/components/Form/FormInput'
import FormSelect from '@/components/Form/FormSelect'
import Toolbar from '@/components/Toolbar'
import OverScreen from '@/components/ui/OverScreen'
import DataTable from '@/components/DataTable/DataTable'
import Column from '@/components/DataTable/Column'
import TestTable from '@/components/DataTable/TestTable'
import AppButton from '@/components/ui/AppButton.vue'


import { mapGetters, mapActions } from 'vuex';


export default {
  name: "Clients",
  components: {
    FormBase,
    Toolbar,
    OverScreen,
    FormInput,
    FormSelect,
    DataTable,
    AppButton,
    TestTable,
    Column
  },

  data() {
    return {
      isSaveDialog: false,
      isDeleteDialog: false,
      isOverScreen: false,
      client: null,
      clientId: null,
      selectedGroups: [],
      clientFullName: null,

      // данные клиента
      clientSet: {
        client_name: null,
        client_surname: null,
        group_id: null,
      },

      // заголовки столбцов таблицы
      headers: [
        {
          key: 'client_surname',
          label: 'Фамилия',
        },
        {
          key: 'client_name',
          label: 'Имя',
        },
        {
          key: 'group_name',
          label: 'Группа'
        },

      ],

    };
  },

  computed: {

    // вычисляем группу клиента
    getGroupName() {
      for (let client of this.CLIENTS) {
        for (let group of client.groups) {
          return group.group_name;
        }
      }
    },

    getClientFullName() {
      for (let client of this.CLIENTS) {
        return this.clientFullName = client.client_surname + " " + client.client_name;
      }

    },
    
    ...mapGetters([
      'CLIENTS',
      'GROUPS'
    ])
  },


  methods: {

    // открытие диалога сохранения клиента
    openSaveDialog() {
      this.isSaveDialog = true;
      this.isOverScreen = true;
    },

    // закрытие диалога сохранения клиента
    closeSaveDialog() {
      this.isSaveDialog = false;
      this.isOverScreen = false;
    },

    // сохранение клиента в базу
    saveClient() {
      this.$store.dispatch('SET_CLIENTS', this.clientSet)
      this.clientSet.client_name = '';
      this.clientSet.client_surname = '';
      this.clientSet.group_id = '';
      this.isSaveDialog = false;
      this.isOverScreen = false;
    },

    // открытие диалога подтверждения удаления клиента
    openConfirmationDialog(client) {
      this.clientId = client.id;
      this.client = client.client_surname + " " + client.client_name;
      this.isDeleteDialog = true
      this.isOverScreen = true
    },

    // закрытие диалога подтверждения удаления клиента
    closeConfirmationDialog() {
      this.isOverScreen = false;
      this.isDeleteDialog = false;
    },

    // удаление клиента
    deleteClient() {
      this.$store.dispatch("DELETE_CLIENT", this.clientId);
      this.isDeleteDialog = false;
      this.isOverScreen = false;
    },

    ...mapActions([
      'GET_CLIENTS',
      'GET_GROUPS'
    ])
  },

  watch: {
    selectedGroups() {
      this.clientSet.group_id = this.selectedGroups.id
    }
  },

  mounted() {
    this.GET_CLIENTS();
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

.clients {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dialogText {
  margin-bottom: 50px;
}

.capitalize {
  text-transform: capitalize;
}
</style>
