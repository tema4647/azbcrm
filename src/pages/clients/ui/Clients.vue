<template>
  <div class="clients">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>

    <Teleport to="#app">
        <ClientData  v-if="isClientData" @closeClientData="closeClientData"  :client="client"/>
    </Teleport>


    <!-- таблица -->
    <DataTable :items="searchClientsFilter" :headers="headers" @deleteItem="openConfirmationDialog"
      @openClientData="openClientData" @editItem="openEditDialog">
      <template #header>
        <AppButton class="btn-success btn-rounded text-white" @click="openSaveDialog">
          Добавить
        </AppButton>
        <Search v-model="searchClient" placeholder="Найти клиента" />
      </template>
    </DataTable>

    <!-- диалог добавления клиента в базу -->
    <transition name="fade">
      <FormBase v-if="isSaveDialog" @closeDialog="closeSaveDialog">
        <template #header>
          Добавить клиента
        </template>
        <template #body>
          <FormInput v-model="clientsList.client_child_fio" lable="Фамилия, Имя" type="text"
            placeholder="Например, Репетун Иван" />
          <FormInput v-model="clientsList.client_child_birth" lable="Дата рождения" type="date" placeholder="Выбрать" />
          <FormInput v-model="clientsList.client_parent_fio" lable="Ф.И.О родителя" type="text"
            placeholder="Например, Репетун Анна" />
          <FormInput v-model="clientsList.client_parent_phone" lable="Телефон" type="text"
            placeholder="Например, 89128807879" />
          <FormInput v-model="clientsList.client_parent_email" lable="Email" type="text"
            placeholder="Например, tratata@yandex.ru" />

          <FormSelect v-if="checked" v-model:select="selectedIndividuals" :options="INDIVIDUALS"
            optionFieldName="individual_name" lable="Индивидуальное" />
          <FormSelect v-else v-model:select="selectedGroups" :options="GROUPS" optionFieldName="group_name"
            lable="Группа" />
        </template>
        <template #footer>
          <div class="clients__checkbox-group">
            <FormCheckbox v-model="checked" lable="Индивидуальное" />
          </div>
          <div class="button-group">
            <AppButton class="btn-rounded btn-empty" @click.prevent="closeSaveDialog">Отменить</AppButton>
            <AppButton class="btn-rounded btn-success text-white" @click.prevent="saveClient">Сохранить</AppButton>
          </div>
        </template>
      </FormBase>
    </transition>

    <!-- диалог обновления клиента в базе -->
    <transition name="fade">
      <FormBase v-if="isEditDialog" @closeDialog="closeEditDialog">
        <template #header>
          Обновить данные клиента
        </template>
        <template #body>
          <FormInput v-model="clientsList.client_child_fio" lable="Фамилия, Имя" type="text"
            placeholder="Например, Репетун Иван" />
          <FormInput v-model="clientsList.client_child_birth" lable="Дата рождения" type="date" placeholder="Выбрать" />
          <FormInput v-model="clientsList.client_parent_fio" lable="Ф.И.О родителя" type="text"
            placeholder="Например, Репетун Анна" />
          <FormInput v-model="clientsList.client_parent_phone" lable="Телефон" type="text"
            placeholder="Например, 89128807879" />
          <FormInput v-model="clientsList.client_parent_email" lable="Email" type="text"
            placeholder="Например, tratata@yandex.ru" />
        </template>
        <template #footer>
          <AppButton class="btn-rounded btn-empty" @click.prevent="closeEditDialog">Отменить</AppButton>
          <AppButton class="btn-rounded btn-success text-white" @click.prevent="editClient">Обновить</AppButton>
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
import FormBase from '@/shared/ui/form/FormBase'
import FormInput from '@/shared/ui/form/FormInput'
import FormSelect from '@/shared/ui/form/FormSelect'
import OverScreen from '@/shared/ui/screen/OverScreen'
import DataTable from '@/widgets/data-table/DataTable'
import Search from '@/widgets/data-table/Search.vue'
import AppButton from '@/shared/ui/buttons/AppButton.vue'
import FormCheckbox from '@/shared/ui/form/FormCheckbox'
import ClientData from '@/entities/client/ClientData.vue'

import { mapGetters, mapActions } from 'vuex'


export default {
  name: "Clients",
  components: {
    FormBase,
    OverScreen,
    FormInput,
    FormSelect,
    DataTable,
    AppButton,
    Search,
    FormCheckbox,
    ClientData,
  },

  data() {
    return {
      componentKey: 0,
      isSaveDialog: false,
      isEditDialog: false,
      isDeleteDialog: false,
      isOverScreen: false,
      isClientData: false,
      searchClient: '',
      checked: false,
      client: null,
      clientId: null,
      selectedGroups: null,
      selectedIndividuals: null,


      clientsList: {
        client_child_fio: '',
        client_child_birth: null,
        client_parent_fio: '',
        client_parent_phone: null,
        client_parent_email: '',
        client_parent_amount: 0.00,
        group_id: null,
        individual_id: null,
      },



      // заголовки столбцов таблицы
      headers: [
        {
          key: 'client_child_fio',
          label: 'Имя',
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
    searchClientsFilter() {
      const searchList = this.CLIENTS.filter(clients => clients.client_child_fio?.match(new RegExp(`${this.searchClient}`, 'gi') || []))
      return searchList
    },


    // выпримляем многомерный массив для таблицы
    clients() {
      return this.CLIENTS.map(client => {
        // деструктурируем вложенный массив "client.groups", присваиваем дефолтное значение
        const [group = { group_name: '' }] = client.groups
        return {
          id: client.id,
          client_child_fio: client.client_child_fio,
          client_child_birth: client.client_child_birth,
          client_parent_fio: client.client_parent_fio,
          client_parent_phone: client.client_parent_phone,
          client_parent_email: client.client_parent_email,
          client_parent_amount: client.client_parent_amount,
          group_name: group.group_name,
          group_id: group.id
        }
      });
    },

    ...mapGetters([
      'CLIENTS',
      'GROUPS',
      'INDIVIDUALS'
    ])
  },


  methods: {
    
    // открытие карточки клиента
    openClientData(client) {
      this.isClientData = true
      this.isOverScreen = true
      this.client = client
    },

    // закрытие карточки клиента
    closeClientData() {
      this.client = null
      this.isClientData = false
      this.isOverScreen = false
    },


    // открытие диалога сохранения клиента
    openSaveDialog() {
      this.isSaveDialog = true;
      this.isOverScreen = true;
    },

    // закрытие диалога сохранения клиента
    closeSaveDialog() {
      this.selectedGroups = null;
      this.clientsList.client_child_fio = '';
      this.clientsList.client_child_birth = '';
      this.clientsList.client_parent_fio = '';
      this.clientsList.client_parent_phone = '';
      this.clientsList.client_parent_email = '';
      this.clientsList.group_id = null;
      this.clientsList.individual_id = null;
      this.checked = false,
        this.isSaveDialog = false;
      this.isOverScreen = false;
    },

    // сохранение клиента в базу
    saveClient() {
      this.$store.dispatch('SET_CLIENTS', this.clientsList)
      this.selectedGroups = null;
      this.selectedIndividuals = null;
      this.clientsList.client_child_fio = '';
      this.clientsList.client_child_birth = '';
      this.clientsList.client_parent_fio = '';
      this.clientsList.client_parent_phone = '';
      this.clientsList.client_parent_email = '';
      this.clientsList.group_id = null;
      this.clientsList.individual_id = null;
      this.checked = false,

        this.isSaveDialog = false;
      this.isOverScreen = false;
    },

    // открытие диалога обновления клиента
    openEditDialog(client) {
      this.clientId = client.id;
      this.clientsList.client_child_fio = client.client_child_fio;
      this.clientsList.client_child_birth = client.client_child_birth;
      this.clientsList.client_parent_fio = client.client_parent_fio;
      this.clientsList.client_parent_phone = client.client_parent_phone;
      this.clientsList.client_parent_email = client.client_parent_email;
      this.clientsList.client_parent_amount = client.client_parent_amount;
      this.isEditDialog = true;
      this.isOverScreen = true;

    },

    // закрытие диалога обновления клиента
    closeEditDialog() {
      this.isEditDialog = false;
      this.isOverScreen = false;
    },

    // обновление клиента в базе
    editClient() {
      this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientsList])
      this.clientsList.client_child_fio = '';
      this.clientsList.client_child_birth = '';
      this.clientsList.client_parent_fio = '';
      this.clientsList.client_parent_phone = '';
      this.clientsList.client_parent_email = '';
      this.isEditDialog = false;
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
      'GET_GROUPS',
      'GET_INDIVIDUALS'
    ])
  },

  watch: {
    // следим за выбором группы
    selectedGroups() {
      this.clientsList.group_id = this.selectedGroups?.id
    },

    // следим за выбором индивидуала
    selectedIndividuals() {
      this.clientsList.individual_id = this.selectedIndividuals?.id
    },

  },

  mounted() {
    this.GET_CLIENTS();
    this.GET_GROUPS();
    this.GET_INDIVIDUALS();
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



.button-group {
  display: flex;
  gap: 10px;
}

.clients__form-checkbox {
  position: absolute;
  left: 0px;
}

.clients__checkbox-group {
  position: absolute;
  left: 20px;
  display: flex;
  gap: 20px;
}
</style>
