<!-- Основа формы -->
<template>
  <div class="FormBase">
    <div class="FormBase__header">
      <slot name="header"></slot>
      <div class="FormBase__closeButton" @click="handleClick"></div>
    </div>

    <div class="FormBase__body">
      <slot name="body"></slot>
    </div>

    <div class="FormBase__footer">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FormBase',
  data() {
    return {

    }
  },

  methods: {
    handleClick() {
      this.$emit('closeDialog')
    }
  },

}
</script>

<style lang="scss" scoped>
.FormBase {
  width: 35%;
  background-color: var(--white-color);
  border-radius: 5px;
  box-shadow: var(--shadow);
  z-index: 999;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transform: translateY(50%);
}

.FormBase__closeButton {
  width: 20px;
  height: 20px;
  border: 2px solid #609af8;
  border-radius: 100%;
  cursor: pointer;
}

.FormBase__header {
  font-size: 20px;
  color: black;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}


.FormBase__body {
  padding: 20px;
  background-color: rgb(243, 243, 243);
}

.FormBase__footer {
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 16px 20px;
}
</style>