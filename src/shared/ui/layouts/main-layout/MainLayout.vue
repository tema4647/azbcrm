<template>
  <div class="mainLayout">
    <TopBar />
    <div class="wrapper">
      <MenuBar />
      <MainContent>
        <router-view />
      </MainContent>
    </div>
  </div>
</template>

<script>
import MenuBar from '@/widgets/MenuBar'
import TopBar from '@/widgets/TopBar'
import MainContent from '@/widgets/MainContent'


export default {
  name: 'MainLayout',
  components: {
    MenuBar,
    TopBar,
    MainContent
  }
}
</script>

<style lang="scss" scoped>
.mainLayout {
  display: flex;
  flex-direction: column;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>