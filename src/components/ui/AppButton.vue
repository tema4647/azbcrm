<template>
  <button :class="{disabled: disabled}" class="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name:'AppButton',
    props:{
      disabled:{
        type: Boolean,
        default: false
      }
    }
      
    ,
    data(){
      return{
      }
    }
  }
</script>

<style lang="scss" scoped>
.button{
  display: flex;
  align-items: center;
  min-width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  padding: 15px;
  font-family: inherit;
  font-weight: 500;
  font-size: 12px;
  }
  .disabled{
    pointer-events: none;
    opacity: .5;
  }

</style>