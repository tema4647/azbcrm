<template>
    <div class="search">
        <input class="search__input" type="search" :placeholder=placeholder :value="modelValue" @input="handleInput">
    </div>
</template>

<script>
export default {
    name: 'search',
    props: {
        placeholder: '',
        modelValue: ''
    },
    methods: {
        handleInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }

}
</script>

<style lang="scss" scoped>
.search {
    position: relative;
}

.search::before {
    content: " ";
    background-image: url(../../assets/img/icon/search.png);
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    width: 17px;
    height: 17px;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    z-index: 100;
    opacity: .3;

}

.search__input {
    width: 300px;
    outline: none;
    min-height: 35px;
    border: 2px solid rgb(230, 230, 230);
    border-radius: 5px;
    padding: 5px;
    padding-left: 45px;
    font-size: 13px;
    font-family: inherit;
}
</style>