<template>
    <div class="overScreen"></div>
</template>

<script>
    export default {
        name:'OverScreen',
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
opacity: .7;
}

</style>