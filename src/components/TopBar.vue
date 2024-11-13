<template>
  <div class="topBar">
    <!-- затемнение при открытии формы -->
    <transition name="fade">
      <OverScreen v-if="isOverScreen"></OverScreen>
    </transition>
    <AppButton class="btn-rounded btn-success text-white" @click="openDialog">
      Оформить услугу
    </AppButton>
    <TheFormForArrange v-if="isVisible" @saveForm="saveForm" @closeDialog="closeDialog"></TheFormForArrange>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import TheFormForArrange from '@/components/TheFormForArrange'
import OverScreen from '@/components/ui/OverScreen'


export default {
  name: 'TopBar',
  components: {
    AppButton,
    TheFormForArrange,
    OverScreen
  },

  data(){
    return {
      isVisible: false,
      isOverScreen: false
    }
  },

  methods:{
    openDialog(){
      this.isVisible = true
      this.isOverScreen = true
    },
    saveForm(){
      this.isVisible = false
      this.isOverScreen = false
    },
    closeDialog(){
      this.isVisible = false
      this.isOverScreen = false
    }
  }
 

}
</script>

<style lang="scss" scoped>
.topBar {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
}
</style>