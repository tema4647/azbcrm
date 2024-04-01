<template>
  <AppBase>
    <div class="selectionList">
      <div class="selectionList__header">
        <!-- Класс "icon-border" приходит из global.css -->
        <button class="icon-border" :class="{ 'icon-active': currentButton === button.name }" v-for="button in buttons"
          :key="button.name" @click="handleButton(button)">
          <font-awesome-icon :icon="button.icon" :size="button.size" />
        </button>
      </div>

      <div class="selectionList__body">
        <div class="selectionList__items" :style='{ borderLeft: `3px solid ${item.border_color}` }'
          v-for="item in listItems" :key="item" @click="handleGroup(item.group_name)">
          <span class="item__name">{{ item.group_name }}</span>
        </div>
      </div>
    </div>
  </AppBase>
</template>

<script>
import AppBase from '@/components/ui/AppBase.vue'

export default {
  name: 'SelectionList',
  components: {
    AppBase,
  },

  props: {
    trial: {
      type: Array,
      default: function () {
        return []
      },
    },

    groups: {
      type: Array,
      default: function () {
        return []
      },
    },

    individuals: {
      type: Array,
      default: function () {
        return []
      },
    },


  },


  data() {
    return {
      currentGroup: null,
      currentButton: 'groups',
      buttons: [
        {
          name: 'trial',
          icon: 'fa-solid fa-bullseye',
          size: 'lg',
        },
        {
          name: 'groups',
          icon: 'fa-solid fa-people-group',
          size: 'lg',
        },
        {
          name: 'individuals',
          icon: 'fa-solid fa-person',
          size: 'lg',
        },

      ],
    }
  },

  computed: {
    listItems() {
      if (this.currentGroup) {
        return this.currentGroup
      } else {
        return this.groups
      }
    },
  },

  methods: {
    handleGroup(item) {
      this.$emit('select', item)
    },

    handleButton(button) {
      this.currentGroup = this[button.name]
      this.currentButton = button.name
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
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
