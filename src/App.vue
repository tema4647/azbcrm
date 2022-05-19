<template>
  <component :is="layout">
  <router-view/>
</component>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import RegistrLayout from '@/layouts/RegistrLayout'

export default {
  computed:{
    layout(){
      return (this.$route.meta.layout || 'RegistrLayout')
    }
  },
  components:{
    MainLayout,
    RegistrLayout
  }
  
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
  list-style: none;
  color: #616161;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #616161;
}
</style>
