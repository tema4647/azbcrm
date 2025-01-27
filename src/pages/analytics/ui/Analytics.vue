<template>
  <div class="analytics">
    <SelectionList2  :business="BUSINESS"></SelectionList2>
    <div class="widgets-wrapper" >
      <DataWidget v-for="finance in finances" :items="finance"></DataWidget>
    </div>
  </div>
</template>

<script>
import SelectionList2 from '@/widgets/SelectionList2.vue'
import DataWidget from '@/widgets/DataWidget.vue'

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