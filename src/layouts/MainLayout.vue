<template>
  <div class="mainLayout">
   <TopBar/>
    <div class="wrapper">
      <SaidBar/>
      <MainBar>
      <router-view/>
      </MainBar>
    </div>
  </div>
</template>

<script>
import SaidBar from '@/components/SaidBar'
import TopBar from '@/components/TopBar'
import MainBar from '@/components/MainBar'


  export default {
    name:'MainLayout',
    components:{
      SaidBar,
      TopBar,
      MainBar

    }
  }
</script>

<style lang="scss" scoped>
.mainLayout{
  display: flex;
  flex-direction: column;
}
.wrapper{
  display: flex;
}


</style>