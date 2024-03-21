<template>
    <div class="overScreen" @click="handlerClick"></div>
</template>

<script>
    export default {
        name:'OverScreen',

        methods:{
            handlerClick(){
              this.$emit('clickOverScreen');
            }
        }
        
    }
</script>

<style lang="scss" scoped>
.overScreen{
width: 100%;
height: 100%;
top: 0;
left: 0;
position: fixed;
z-index: 10;
background-color: black;
opacity: .1;

}

</style>