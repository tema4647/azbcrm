<template>
  <button :class="{ disabled: disabled }" class="button">
    <slot></slot>
  </button>

</template>

<script>
export default {
  name: 'AppButton',
  data() {
    return {

    }
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  }


}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  min-width: 30px;
  height: 33px;
  border: none;
  cursor: pointer;
  padding: 15px;
  font-family: inherit;
  font-size: 13px;
}

.disabled {
  pointer-events: none;
  opacity: .5;
}
</style>