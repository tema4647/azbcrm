<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import MainLayout from '@/shared/ui/layouts'
import RegistrLayout from '@/shared/ui/layouts'


export default {

  components:{
    MainLayout,
    RegistrLayout
  },

  computed:{
    layout(){
      return (this.$route.meta.layout || 'RegistrLayout')
    }
  },
  
}
</script>

<style lang="scss">

@import '@/shared/ui/assets/variables.css';
@import '@/shared/ui/assets/global.css';




*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  width: 100%;
  max-width:1920px;
  font-size: 16px;
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
  color: #334155;
}
button{
  border: none;
}
</style>
