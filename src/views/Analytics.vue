<template>
  <div class="analytics">
    <SelectionList2 :system="SYSTEM" :business="BUSINESS"></SelectionList2>
    <div class="widgets-wrapper" >
      <DataWidget v-for="finance in finances" :items="finance"></DataWidget>
    </div>
  </div>
</template>

<script>
import SelectionList2 from '@/components/SelectionList2.vue'
import DataWidget from '@/components/DataWidget/DataWidget.vue'

export default {
  name: 'Analytics',
  components: {
    SelectionList2,
    DataWidget
  },
  data() {
    return {
      finances: [
        {
          title: 'Остаток на счетах',
          number: '100000'
        },

        {
          title: 'Остаток в абонементах',
          number: '300000'
        },

        {
          title: 'Оказано услуг на сумму',
          number: '1000000'
        },
      ],


      BUSINESS: [
        { id: 1, group_name: 'Финансы' },
        { id: 2, group_name: 'Операционка' },
      ],

      SYSTEM: [
        { id: 1, group_name: '6', border_color: 'red' },
        { id: 2, group_name: '7', border_color: 'blue' },
        { id: 3, group_name: '8', border_color: 'green' },
        { id: 4, group_name: '9', border_color: 'yellow' },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.analytics {
  height: 100%;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 10px;
}

.widgets-wrapper{
  width: 100%;
  display: flex;
  gap: 10px;
}
</style>