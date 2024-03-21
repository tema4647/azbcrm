<!-- Основа формы -->
<template>
  <div class="FormBase">
    <div class="FormBase__closeButton" @click="handlerClick"></div>

    <div class="FormBase__content">
      <div class="FormBase__header">
        <slot name="header"></slot>
      </div>

      <div class="FormBase__body">
        <slot name="body"></slot>
      </div>


      <div class="FormBase__footer">
        <slot name="footer"></slot>
      </div>
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
    handlerClick() {
      this.$emit('closeDialog')
    }
  },

}
</script>

<style lang="scss" scoped>
.FormBase {
  width: 30%;
  background-color: var(--white-color);
  border-radius: 5px;
  box-shadow: var(--shadow);
  z-index: 999;
  padding: 70px 50px 30px 50px;
  margin: auto;
  position: absolute;
  left:0;
  right: 0;
  top: 0;
  transform: translateY(50%);
}

.FormBase__closeButton {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  border: 2px solid #609af8;
  border-radius: 100%;
  cursor: pointer;
}

.FormBase__content {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.FormBase__header {
 
  font-weight: 500;
}

.FormBase__body {

}

.FormBase__footer {
  display: flex;
  justify-content: end;
  gap: 10px;
  
}

</style>