<!-- input -->
<template>
    <div class="formInput">
        <!-- подпись поля input -->
        <div class="formInput__lable">{{ lable }}</div>
        <!-- input  -->
        <input class="formInput__input" @input="handlerInput"  :value="modelValue" :type="type">
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        lable: {
            type: String
        },
        type: {
            type: String
        },
        modelValue: {
            type: String
        }
    },

    data() {
        return {

        }
    },

    methods: {
        handlerInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
.formInput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.formInput__lable {
    font-size: 16px;
}

.formInput__input {
    border-radius: 3px;
    border: 1px solid #ced4da;
    outline: none;
    min-height: 30px;
    padding: 5px;
    width: 70%;

    &:hover {
        border: 1px solid #609af8;
    }

    &:focus {
        box-shadow: 0px 0px 2px 1px #609af8;
        border: 1px solid #609af8;
    }
}
</style>