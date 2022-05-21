<template>
  <div class="mainContent">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'MainContent'
    
  }
</script>

<style lang="scss" scoped>
.mainContent{
  width: 100%;
  height: calc(100vh - 70px);
  padding: 10px;
  background-color: white;
}
</style>