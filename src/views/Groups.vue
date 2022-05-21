<template>
   <div class="groups">
     <Dialog v-model:visible="display"  :style="{width:'350px'}" header="Добавить группу" >
        <div class="field">
            <label for="name">Придумайте название группы</label>
            <InputText required="true" autofocus autocomplite='none' />
        </div>
        <template #footer>
          <Button label="Отменить"  icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
          <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveGroup"/>
        </template>
     </Dialog>
     <Toolbar>
       <template #start>
         <Button @click='visibleTrue' v-tooltip="'Добавить группу'" icon="pi pi-plus"/>
       </template>
       <template #end>
       </template>
     </Toolbar>
   </div>
</template>

<script>
  export default {
    components:{
    },
    data(){
      return{
        display:false,
      }
    },
    methods:{
      visibleTrue(){
        this.display = true;
      },
      hideDialog(){
        this.display = false;
      }

    }

    
  }
</script>

<style lang="scss" scoped>
.field{
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

</style>