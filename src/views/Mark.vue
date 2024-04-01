<template>
  <div class="mark">

    <!-- панель выбора  -->
    <SelectionList :groups="GROUPS" :individuals="INDIVIDUALS" :trial="TRIAL" @select="selectGroup" />

    <!-- таблица -->
    <MarkTable @openSidebar="openSidebar" @toggleMark="toggleMark" :group="group" :clients="CLIENTS" />


    <!-- <Sidebar /> -->
    <transition name="fade">
      <Sidebar v-model:visible="isSidebar">
        <Money></Money>
      </Sidebar>
    </transition>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"


import Sidebar from "@/components/ui/Sidebar"
import Money from "@/components/Money"
import MarkTable from "@/components/MarkTable"
import SelectionList from "@/components/SelectionList"


export default {
  name: 'Mark',
  components: {
    Sidebar,
    Money,
    SelectionList,
    MarkTable,
  },

  data() {
    return {
      quantityDay: 31,
      isSidebar: false,
      group: 'Радость',

      INDIVIDUALS: [
        { id: 1, group_name: 'egoza' },
        { id: 2, group_name: 'xerox' },
        { id: 3, group_name: 'vrton' },
        { id: 4, group_name: 'melekot' },
      ],

      TRIAL: [
        { id: 1, group_name: '6', border_color: 'red' },
        { id: 2, group_name: '7', border_color: 'blue' },
        { id: 3, group_name: '8', border_color: 'green' },
        { id: 4, group_name: '9', border_color: 'yellow' },
      ]

    }
  },

  methods: {
    toggleMark(toggleMark) {
      toggleMark.firstElementChild.classList.toggle('listItem__dot');
    },
    selectGroup(item) {
      this.group = item
    },

    openSidebar() {
      this.isSidebar = true
    },



    ...mapActions([
      "GET_GROUPS",
      "GET_CLIENTS"
    ]),

  },

  computed: {
    ...mapGetters([
      "GROUPS",
      "CLIENTS"
    ]),
  },

  mounted() {
    this.GET_GROUPS();
    this.GET_CLIENTS();

  },

}
</script>

<style lang="scss" scoped>
// анимация

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// общие
.mark {
  height: 100%;
  display: grid;
  grid-template-columns: 300px auto;
  gap: 5px;
}
</style>