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
    <DataTable :items="clients" :headers="headers" @deleteItem="openConfirmationDialog">
      <template #header>
        <Search placeholder="Найти клиента" />
      </template>
    </DataTable>

    <!-- диалог добавления клиента в базу -->
    <transition name="fade">
      <FormBase v-if="isSaveDialog" @closeDialog="closeSaveDialog">
        <template #header>
          Добавить клиента
        </template>
        <template #body>
          <FormInput v-model="clientSet.client_child_fio" lable="Фамилия, Имя" type="text"
            placeholder="Например, Репетун Иван" />
          <FormInput v-model="clientSet.client_child_birth" lable="Дата рождения" type="date" placeholder="Выбрать" />
          <FormInput v-model="clientSet.client_parent_fio" lable="Ф.И.О родителя" type="text"
            placeholder="Например, Репетун Анна" />
          <FormInput v-model="clientSet.client_parent_phone" lable="Телефон" type="text"
            placeholder="Например, 89128807879" />
          <FormInput v-model="clientSet.client_parent_email" lable="Email" type="text"
            placeholder="Например, tratata@yandex.ru" />

          <FormSelect v-model:select="selectedGroups" :options="GROUPS" lable="Группа"></FormSelect>
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white" @click.prevent="saveClient">Сохранить</AppButton>
        </template>
      </FormBase>
    </transition>

    <!-- диалог удаления клиента из базы -->
    <FormBase v-if="isDeleteDialog" @closeDialog="closeConfirmationDialog">
      <template #header>
        Удалить клиента
      </template>
      <template #body>
        <p class="dialogText">Вы уверены что хотите удалить <strong class="capitalize">{{ client }}</strong> из списка ?
        </p>
      </template>
      <template #footer>
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
import Search from '@/components/DataTable/Search.vue'
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
    Column,
    Search
  },

  data() {
    return {
      isSaveDialog: false,
      isDeleteDialog: false,
      isOverScreen: false,
      client: null,
      clientId: null,
      selectedGroups: 1,

      // данные клиента
      clientSet: {
        client_child_fio: null,
        client_child_birth: null,
        client_parent_fio: null,
        client_parent_phone: null,
        client_parent_email: null,
        group_id: null,
      },

      // заголовки столбцов таблицы
      headers: [
        {
          key: 'client_child_fio',
          label: 'Имя',
        },

        {
          key: 'group_name',
          label: 'Группа'
        },

        {
          key: 'client_parent_fio',
          label: 'Родитель'
        },

        {
          key: 'client_parent_phone',
          label: 'Телефон родителя'
        },

        {
          key: 'client_parent_email',
          label: 'Email родителя'
        },

        {
          key: 'client_child_birth',
          label: 'Дата рождения',
        },

      ],



    };
  },

  computed: {

    // выпримляем многомерный массив для таблицы
    clients() {
      return this.CLIENTS.map(client => {
        // деструктурируем вложенный массив "client.groups", присваиваем дефолтное значение
        const [group = {group_name: ''}] = client.groups
        return {
            id: client.id,
            client_child_fio: client.client_child_fio,
            client_child_birth: client.client_child_birth,
            client_parent_fio: client.client_parent_fio,
            client_parent_phone: client.client_parent_phone,
            client_parent_email: client.client_parent_email,
            group_name: group.group_name
          }
      });
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
      this.clientSet.client_child_fio = '';
      this.clientSet.client_child_birth = '';
      this.clientSet.client_parent_fio = '';
      this.clientSet.client_parent_phone = '';
      this.clientSet.client_parent_email = '';
      this.clientSet.group_id = '';
      this.isSaveDialog = false;
      this.isOverScreen = false;
    },

    // открытие диалога подтверждения удаления клиента
    openConfirmationDialog(client) {
      this.clientId = client.id;
      this.client = client.client_child_fio;
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
    // следим за выбором группы
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
