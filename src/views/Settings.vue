<template>
  <div class="settings">
    <SelectionList />
    <!-- таблица -->
    <DataTable>
      <template #header>
        <AppButton class="btn-success btn-rounded text-white">
          Добавить
        </AppButton>
        <Search placeholder="" />
      </template>
    </DataTable>
  </div>
</template>

<script>
import SelectionList from "@/components/SelectionList"
import DataTable from "@/components/DataTable/DataTable.vue"
import Search from '@/components/DataTable/Search.vue'
import AppButton from '@/components/ui/AppButton.vue'


export default {
  name: 'Settings',
  components: {
    SelectionList,
    DataTable,
    AppButton,
    Search
  }
}
</script>

<style lang="scss" scoped>
.settings {
  height: 100%;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 5px;
}
</style>