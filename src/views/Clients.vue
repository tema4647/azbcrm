<template>
  <div class="clients"></div>
  <Dialog
    v-model:visible="display"
    :style="{ width: '450px' }"
    header="Добавить клиента"
    
  >
    <div class="field">
      <label for="surname">Фамилия</label>
      <InputText required="true" autofocus autocomplite="none" />
    </div>
    <div class="field">
      <label for="name">Имя</label>
      <InputText required="true" autofocus autocomplite="none" />
    </div>
    <div class="field">
      <label for="name">Группа</label>
      <MultiSelect v-model="selectedGroups" :options="groups" placeholder="Выберите группу" />
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
  <Toolbar>
    <template #start>
      <Button
        @click="visibleTrue"
        v-tooltip="'Добавить клиента'"
        icon="pi pi-plus"
      />
    </template>
    <template #end> </template>
  </Toolbar>
</template>

<script>
export default {
  name: "Clients",
  data() {
    return {
      display: false,
      selectedGroups: null,
    };
  },

  components: {},
  methods: {
    visibleTrue() {
      this.display = true;
    },
    hideDialog() {
      this.display = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-bottom: 15px;
}
</style>
