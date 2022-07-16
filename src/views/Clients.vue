<template>
  <div class="clients">

    <Toast />
    <ConfirmDialog acceptLabel="Удалить"> </ConfirmDialog>

    <!-- форма добавления клиента в базу -->
    <Dialog
      v-model:visible="display"
      :style="{ width: '450px' }"
      header="Добавить клиента"
      
    >
      <div class="field">
        <label for="surname">Фамилия</label>
        <InputText
        required="true" 
        autofocus 
        autocomplite="none"
        v-model="clientSet.client_surname"
        />

      </div>
      <div class="field">
        <label for="name">Имя</label>
        <InputText
        required="true" 
        autofocus 
        autocomplite="none" 
        v-model="clientSet.client_name"

        />
      </div>
      <div class="field">
        <label for="name">Группа</label>
        <MultiSelect v-model="selectedGroups" :options="GROUPS" optionLabel="group_name"  placeholder="Выберите группу" display="chip" p-multiselect />
      </div>
      <template #footer>
        <Button
          label="Отменить"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Сохранить"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveClient"
        />
      </template>
    </Dialog>

    <!-- тулбар -->
    <Toolbar>
      <template #start>
        <Button
          class="p-button-success"
          @click="visibleTrue"
          v-tooltip="'Добавить клиента'"
          icon="pi pi-plus"
        />
      </template>
      <template #end> </template>
    </Toolbar>

    <!-- таблица с клиентами -->
    <DataTable :value="CLIENTS" class="dataTable">
      
      <Column
          field="client_surname"
          header="Фамилия"
          bodyStyle="text-transform:capitalize;"
      >
      </Column>

      <Column
          field="client_name"
          header="Имя"
          bodyStyle="text-transform:capitalize;"
      >
      </Column>

      <Column
          headerStyle="width: 0rem; text-align: center"
          bodyStyle="text-align: center; overflow: visible"
        >
        <template #body="slotProps">
          <Button
            @click="confirmDeleteClient(slotProps.data)"
            class="p-button-rounded p-button-warning p-button-sm"
            type="button"
            icon="pi pi-trash"
          ></Button>
        </template>
      </Column>
      
    </DataTable>

    <!-- форма удаления клиента из базы -->
    <Dialog
        v-model:visible="deleteClientDialog"
        :style="{ width: '450px' }"
        header="Подтвердите удаление"
        :modal="true"
      >
        <div class="confirmation-content">
          <span v-if="client"
            >Вы уверены что хотите удалить клиента <b class="capitalize">{{client}}</b>?
          </span
          >
        </div>
        <template #footer>
          <Button
            label="Отменить"
            icon="pi pi-times"
            class="p-button-text"
            @click="deleteClientDialog = false"
          />
          <Button
            label="Удалить"
            icon="pi pi-check"
            class="p-button-text"
            @click="deleteClient"
          />
        </template>
    </Dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Clients",

  data() {
    return {
      display: false,
      selectedGroups: null,
      deleteClientDialog: false,
      client: null,
      clientId: null,
      filters: {},
      clientSet:{
        client_name: null,
        client_surname: null
      }
    };
  },

  methods: {

    // подтверждение удаления клиента из базы
    confirmDeleteClient(client){
      this.clientId = client.id;
      this.client = client.client_surname + " " + client.client_name;
      this.deleteClientDialog = true

    },

    // удаление клиента
    deleteClient() {
      this.$store.dispatch("DELETE_CLIENT", this.clientId);
      this.$toast.add({
        severity: "success",
        summary: "Удачно!",
        detail: "Клиент удалён",
        life: 3000,
      });
      this.deleteClientDialog = false;
      
    },

    // сохранение клиента в базу
    saveClient(){ 
      this.$store.dispatch('SET_CLIENTS', this.clientSet)
      this.clientSet.client_name = '';
      this.clientSet.client_surname = '';
      this.display = false;
    },

    visibleTrue() {
      this.display = true;
    },
    hideDialog() {
      this.display = false;
    },
    ...mapActions([
      'GET_CLIENTS',
      'GET_GROUPS'
    ])
  },
  computed:{
    ...mapGetters([
      'CLIENTS',
      'GROUPS'
    ])
  },
  mounted(){
    this.GET_CLIENTS();
    this.GET_GROUPS();
  }
};
</script>

<style lang="scss" scoped>
.dataTable {
  margin-top: 15px;
}
.field {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-bottom: 15px;
}
.capitalize{
  text-transform:capitalize;
}
</style>
