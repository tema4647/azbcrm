<template>
  <div class="basis">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:"AppBase"
  }
</script>

<style lang="scss" scoped>

.basis{
  min-width: 200px;
  width: 100%;
  height: 100%;
  background-color: var(--grey-color);
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
}

.basis::-webkit-scrollbar { 
    width: 0px;  
}

</style>