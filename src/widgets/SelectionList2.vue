<template>
  <AppBase>
    <div class="selectionList">
      <div v-if="tabs.length < 2 ? false : true" class="selectionList__header">
        <!-- Класс "icon-border" приходит из global.css -->
        <button class="icon-border" :class="{ 'icon-active': currentTab === tab.name }" v-for="tab in tabs"
          :key="tab.name" @click="handleTab(tab)">
          <font-awesome-icon :icon="tab.icon" :size="tab.size" />
        </button>
      </div>

      <div class="selectionList__body">
        <div class="selectionList__items" :style='{ borderLeft: `3px solid ${item.border_color}` }'
          v-for="item in listItems" :key="item" @click="handleItem(item.group_name)">
          <span class="item__name">{{ item.group_name }}</span>
        </div>
      </div>
    </div>
  </AppBase>
</template>

<script>
import AppBase from '@/shared/ui/base/AppBase.vue'

export default {
  name: 'SelectionList2',
  components: {
    AppBase,
  },

  props: {
    system: {
      type: Array,
      default: function () {
        return []
      },
    },


    business: {
      type: Array,
      default: function () {
        return []
      },
    },


    tabs: {
      type: Array,
      default: function () {
        return []
      },
    }

  },


  data() {
    return {
      selectedListItems: null,
      currentItem: null,
      currentTab: 'business',
    }
  },

  computed: {
    listItems() {
      return this.selectedListItems ? this.selectedListItems : this.business
    },
  },

  methods: {
    handleItem(item) {
      this.currentItem = item
    },

    handleTab(tab) {
      this.selectedListItems = this[tab.name]
      this.currentTab = tab.name
    },
  },

  watch: {
    listItems: {
      handler(listItems) {
        this.currentItem = listItems[0]?.group_name
      },
    },

    currentItem: {
      handler(currentItem) {
        this.$emit('select', currentItem)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.selectionList {
  width: 100%;
}

.selectionList__header {
  width: 100%;
  min-height: 45px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--main-color);
  padding: 7px 10px;
  column-gap: 10px;
  position: sticky;
  top: 0;
  left: 0;
}


.selectionList__body::-webkit-scrollbar {
  width: 0;
}

.selectionList__items {
  padding: 10px;
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  margin-top: 5px;
  cursor: pointer;
}


.item__name {
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
