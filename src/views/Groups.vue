<template>
  <div class="groups">

    <!-- тулбар -->
    <Toolbar>
      <AppButton @click="visibleTrue" class="btn-success btn-rounded text-white">Добавить</AppButton>
    </Toolbar>

    <!-- таблица с группами -->
    <DataTable :items="GROUPS" :headers="headers" @click="debug"></DataTable>
    <!-- <TestTable :columns="columns" :entities="entities" @onEdit="onEdit" @onDelete="onDelete" /> -->


    <!-- форма сохранения группы в базу -->

    <FormBase class="baseDialogPlace" v-if="display" @closeDialog="hideDialog">
      <template v-slot:header>
        Форма добавления группы в базу
      </template>
      <template v-slot:body>
        <FormInput v-model="groupValue" lable="Имя" type="text"></FormInput>
      </template>
      <template v-slot:footer>
        <AppButton @click.prevent="saveGroup()" class="btn-rounded btn-success">Сохранить</AppButton>
      </template>
    </FormBase>

    <!-- форма удаления группы из базы -->


  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import FormBase from '@/components/Form/FormBase'
import FormInput from '@/components/Form/FormInput'
import DataTable from '@/components/DataTable/DataTable.vue'
import TestTable from '@/components/DataTable/TestTable.vue'
import AppButton from '@/components/ui/AppButton.vue'







import { mapGetters, mapActions } from "vuex";

export default {
  name: "Groups",
  components: {
    Toolbar,
    FormBase,
    FormInput,
    DataTable,
    TestTable,
    AppButton
  },


  data() {
    return {
      display: false,
      groupValue: "",
      deleteGroupDialog: false,
      groupId: "",
      group: "",
      // Заголовки столбцов таблицы
      headers: [
        {
          key: 'group_name',
          label: 'Группа'
        },

      ],
    };
  },

  methods: {
    // тестовые методы таблицы
    onEdit(entity) {
      console.log('edit event: ', entity);
    },
    onDelete(entity) {
      console.log('delete event: ', entity);
    },
    // тестовые методы 


    debug() {
      console.log(1)
    },

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

.capitalize {
  text-transform: capitalize;
}
</style>
