<template>
    <div class="sidebar" v-if="visible">
        <div class="sidebar__close" @click="handlerClick"></div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Sidebare',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handlerClick() {
            this.$emit('update:visible')
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    width: 300px;
    height: 100%;
    background-color: var(--main-color);
    position: absolute;
    right: 0px;
    top: 0;
    padding: 40px 10px 20px 10px;
}


.sidebar__close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-radius: 100%;
    cursor: pointer;
}
</style>