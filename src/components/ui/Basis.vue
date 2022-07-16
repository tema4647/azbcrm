<template>
  <div class="basis">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:"Basis"
    
  }
</script>

<style lang="scss" scoped>

.basis{
  min-width: 100px;
  min-height: 100px;
  height:100%;
  background-color: #EDEDED;
  border-radius: 5px;
  padding: 10px;
}

</style>