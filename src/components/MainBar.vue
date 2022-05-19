<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'MainBar'
    
  }
</script>

<style lang="scss" scoped>
.main{
  width:100%;
  height: 100%;
  padding: 20px;
}
</style>