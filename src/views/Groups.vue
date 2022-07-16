<template>
  <div class="groups">

    <Toast />
    <ConfirmDialog acceptLabel="Удалить"> </ConfirmDialog>

    <!-- форма сохранения группы в базу -->
    <Dialog
      v-model:visible="display"
      :style="{ width: '350px' }"
      header="Добавить группу"
    >
      <div class="field">
        <label for="name">Придумайте название группы</label>
        <InputText
          required="true"
          autofocus
          autocomplite="none"
          v-model="groupValue"
        />
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
          @click="saveGroup"
        />
      </template>
    </Dialog>

    <!-- тулбар -->
    <Toolbar>
      <template #start>
        <Button
          class="p-button-success"
          @click="visibleTrue"
          v-tooltip="'Добавить группу'"
          icon="pi pi-plus"
        />
      </template>
      <template #end> </template>
    </Toolbar>

    <!-- таблица с группами -->
    <DataTable :value="GROUPS" class="dataTable">
      <Column
        field="group_name"
        header="Группа"
        bodyStyle="text-transform:capitalize;"
      ></Column>
      <Column
        headerStyle="width: 0rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
      <template #body="slotProps">
        <Button
          @click="confirmDeleteGroup(slotProps.data)"
          class="p-button-rounded p-button-warning p-button-sm"
          type="button"
          icon="pi pi-trash"
        ></Button>
      </template>
      </Column>
    </DataTable>

    <!-- форма удаления группы из баззы -->
    <Dialog
      v-model:visible="deleteGroupDialog"
      :style="{ width: '450px' }"
      header="Подтвердите удаление"
      :modal="true"
    >
      <div class="confirmation-content">
        <span v-if="group"
          >Вы уверены что хотите удалить группу <b class="capitalize">{{group}}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Отменить"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteGroupDialog = false"
        />
        <Button
          label="Удалить"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteGroup"
        />
      </template>
    </Dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Groups",

  data() {
    return {
      display: false,
      groupValue: "",
      deleteGroupDialog: false,
      groupId: "",
      group:""
    };
  },

  methods: {
    visibleTrue() {
      this.display = true;
    },
    hideDialog() {
      this.display = false;
    },

    // сохранение группы в базу
    saveGroup() {
      if (this.groupValue !== "") {
        this.$store.dispatch("SET_GROUPS", this.groupValue);
        this.display = false;
        this.groupValue = "";
      }
    },
    
    // подтверждение удаления группы из базы
    confirmDeleteGroup(group) {
      this.groupId = group.id
      this.group = group.group_name;
      this.deleteGroupDialog = true;
    },
    
    // удаление группы из базы
    deleteGroup() {
      this.$store.dispatch("DELETE_GROUP", this.groupId);
      this.$toast.add({
        severity: "success",
        summary: "Удачно!",
        detail: "Группа удалена",
        life: 3000,
      });
      this.deleteGroupDialog = false;
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
.field {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}
.dataTable {
  margin-top: 15px;
}
.capitalize{
  text-transform:capitalize;
}
</style>
