<template>
  <div class="toolbar">
    <AppBase>
      <div class="wrapper-button">
        <slot></slot>
      </div>
    </AppBase>
  </div>
</template>

<script>
import AppBase from '@/components/ui/AppBase.vue'

  export default {
    name:'Toolbar',

    components:{
      AppBase
    }
  }
</script>

<style lang="scss" scoped>
.toolbar{
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
}
.wrapper-button{
  width: 100%;
  height: 100%;
  display: flex;
}

</style>