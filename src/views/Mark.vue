<template>
  <div class="mark">

    <!-- панель выбора  -->
    <SelectionList :groups="GROUPS" :individuals="INDIVIDUALS" :trial="TRIAL" @groups="groupsOpen" />

    <!-- таблица -->
    <MarkTable @openSidebar="openSidebar" @toggleMark="toggleMark" />


    <!-- <Sidebar /> -->
    <transition name="fade">
      <Sidebar v-model:visible="visibleSidebar">
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
      visibleSidebar: false,
      cards: [
        {
          id: 1,
          name: 'Репетун Макар',
        },
        {
          id: 2,
          name: 'Хузягулова Арина',

        },
        {
          id: 3,
          name: 'Мухаметзянова Алина',

        },
        {
          id: 4,
          name: 'Хузягулова Арина',

        },
        {
          id: 5,
          name: 'Хузягулова Арина',

        },
        {
          id: 6,
          name: 'Хузягулова Арина',

        },
        {
          id: 7,
          name: 'Репетун Макар222',

        },
        {
          id: 8,
          name: 'Репетун Макар 333',

        },
        {
          id: 9,
          name: 'Репетун Макар',

        },
        {
          id: 10,
          name: 'Хузягулова Арина',

        },
        {
          id: 11,
          name: 'Мухаметзянова Алина',

        },
        {
          id: 12,
          name: 'Хузягулова Арина',

        },
        {
          id: 13,
          name: 'Хузягулова Арина',

        },
        {
          id: 14,
          name: 'Хузягулова Арина',

        },
        {
          id: 15,
          name: 'Репетун Макар222',

        },
        {
          id: 16,
          name: 'Репетун Макар 333',

        },
        {
          id: 17,
          name: 'Репетун Макар',

        },
        {
          id: 18,
          name: 'Хузягулова Арина',

        },
        {
          id: 19,
          name: 'Мухаметзянова Алина',

        },
        {
          id: 20,
          name: 'Хузягулова Арина',

        },
        {
          id: 21,
          name: 'Хузягулова Арина',

        },
        {
          id: 22,
          name: 'Хузягулова Арина',

        },
        {
          id: 23,
          name: 'Репетун Макар222',

        },
        {
          id: 24,
          name: 'Репетун Макар 333',

        },
      ],
      INDIVIDUALS: [
        { id: 1, group_name: 'egoza' },
        { id: 2, group_name: 'xerox' },
        { id: 3, group_name: 'vrton' },
        { id: 4, group_name: 'melekot' },
      ],

      TRIAL: [
    { id: 1, group_name: '6', border_color: 'red'  },
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
    groupsOpen(groups) {
      console.log(groups);
    },

    openSidebar() {
      this.visibleSidebar = true
    },



    ...mapActions(["GET_GROUPS"]),

  },

  computed: {

    ...mapGetters(["GROUPS"]),
  },
  mounted() {
    this.GET_GROUPS();
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