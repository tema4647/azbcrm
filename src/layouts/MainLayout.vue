<template>
  <div class="mainLayout">
    <TopBar/>
    <div class="wrapper">
      <SaidBar/>
      <MainContent>
      <router-view/>
      </MainContent>
    </div>
  </div>
</template>

<script>
import SaidBar from '@/components/SaidBar'
import TopBar from '@/components/TopBar'
import MainContent from '@/components/MainContent'


  export default {
    name:'MainLayout',
    components:{
      SaidBar,
      TopBar,
      MainContent
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