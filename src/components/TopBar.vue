<template>
  <div class="topBar">
    <AppButton class="btn-rounded btn-success text-white" @click="isVisible = !isVisible">
      Оформить услугу
    </AppButton>
    <TheFormForArrange v-if="isVisible"></TheFormForArrange>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import TheFormForArrange from '@/components/TheFormForArrange'

export default {
  name: 'TopBar',
  components: {
    AppButton,
    TheFormForArrange
  },

  data(){
    return {
      isVisible: false
    }
  },

  methods:{
    
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