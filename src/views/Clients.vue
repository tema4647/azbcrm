<template>
  <div class="clients">
    <!-- затемнение при открытии формы -->
    <OverScreen @clickOverScreen="closeOverScreen()" v-if="overScreen"></OverScreen>

    <!-- тулбар -->
    <Toolbar>
      <AppButton class="btn-success btn-rounded text-white" @click="openClientSaveDialog()">
        Добавить
      </AppButton>
    </Toolbar>

    <!-- таблица -->
    <DataTable :items="CLIENTS" :headers="headers" @click="debug"></DataTable>
    <!-- <TestTable :columns="columns" :entities="entities"></TestTable> -->


    <!-- форма добавления клиента в базу -->
    <FormBase v-if="clientSaveDialog" @closeDialog="closeDialog()">
      <template v-slot:header>
        Форма добавления клиента в базу
      </template>
      <template v-slot:body>
        <FormInput v-model="clientSet.client_name" lable="Имя" type="text"></FormInput>
        <FormInput v-model="clientSet.client_surname" lable="Фамилия" type="text"></FormInput>
        <!-- <FormSelect v-model:select="selectedGroups" lable="Группа" :options="options"></FormSelect> -->
      </template>
      <template v-slot:footer>
        <AppButton class="btn-rounded btn-empty" @click.prevent="closeСlientSaveDialog()">Отменить</AppButton>
        <AppButton @click.prevent="saveClient()" class="btn-rounded btn-success text-white">Сохранить</AppButton>
      </template>
    </FormBase>

    <!-- форма удаления клиента из базы -->
    <FormBase v-if="clientDeleteDialog" @closeDialog="closeDialog">
      <template v-slot:body>
        <p class="dialogText">Вы уверены что хотите удалить <strong class="capitalize">{{ client }}</strong> из списка ?
        </p>
      </template>
      <template v-slot:footer>
        <AppButton @click.prevent="closeСlientDeleteDialog()" class="btn-rounded btn-empty">Отменить</AppButton>
        <AppButton @click.prevent="deleteClient()" class="btn-rounded btn-success">Удалить</AppButton>
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
    TestTable
  },

  // data ---------
  data() {
    return {
      overScreen: false,
      clientSaveDialog: false,
      clientDeleteDialog: false,
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
          key: 'id',
          label: 'id',
        },
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

      // тестовый json
      columns: [
                {
                    key: "id",
                    label: "Id"
                },
                {
                    key: "name",
                    label: "Name"
                },
                {
                    key: "description",
                    label: "Description"
                },
                {
                    key: "price",
                    label: "Price"
                }
            ],
            entities: [
                { id: '01', name: 'Coffee', description: 'Coffee...', price: [{price_name: 'привет'}, {price_name: 'hello'}] },
                { id: '02', name: 'Chocolate', description: 'Chocolate...', price: [{price_name: 'пока'}] }
            ]
      // конец тестовый json

    };
  },

  // computed ----------
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



  // methods ---------------
  methods: {

    debug() {
      console.log(this.CLIENTS);
    },


    // закрытие формы по крестику
    closeDialog() {
      this.overScreen = false;
      this.clientDeleteDialog = false;
      this.clientSaveDialog = false;

    },

    // подтверждение удаления клиента из базы
    confirmDeleteClient(client) {
      this.clientId = client.id;
      this.client = client.client_surname + " " + client.client_name;
      this.clientDeleteDialog = true
      this.overScreen = true
    },

    // удаление клиента
    deleteClient() {
      this.$store.dispatch("DELETE_CLIENT", this.clientId);
      this.deletionDialog = false;
    },

    // сохранение клиента в базу
    saveClient() {
      this.$store.dispatch('SET_CLIENTS', this.clientSet)
      this.clientSet.client_name = '';
      this.clientSet.client_surname = '';
      this.clientSet.group_id = '';
      this.clientSaveDialog = false;
      this.overScreen = false;
    },

    openClientSaveDialog() {
      this.clientSaveDialog = true;
      this.overScreen = true;
    },
    // закрытие окон при клике по затемнению
    closeOverScreen() {
      this.overScreen = false;
      this.clientSaveDialog = false;
      this.clientDeleteDialog = false;
    },

    // отмена удаления клиента из базы
    closeСlientDeleteDialog() {
      this.overScreen = false;
      this.clientDeleteDialog = false;
    },

    // отмена сохранения клиента в базу
    closeСlientSaveDialog() {
      this.overScreen = false;
      this.clientSaveDialog = false;
    },



    ...mapActions([
      'GET_CLIENTS',
      'GET_GROUPS'
    ])
  },

  // watch ----------------
  watch: {
    selectedGroups() {
      this.clientSet.group_id = this.selectedGroups.id
    }
  },



  created() {
  },

  mounted() {
    this.GET_CLIENTS();
    this.GET_GROUPS();

  },

  updated() {

  },
};
</script>



<style lang="scss" scoped>
.dialogText {
  margin-bottom: 50px;
}

.capitalize {
  text-transform: capitalize;
}
</style>
