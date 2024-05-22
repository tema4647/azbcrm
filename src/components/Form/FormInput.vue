<!-- input -->
<template>
    <div class="formInput">
        <!-- подпись поля input -->
        <div class="formInput__lable">{{ lable }}</div>
        <!-- input  -->
        <input class="formInput__input" @input="handleInput" :value="modelValue" :type="type" :placeholder="placeholder">
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
        },
        placeholder: {
            type: String
        },
        
    },

    data() {
        return {

        }
    },

    methods: {
        handleInput(e) {
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
    margin-bottom: 17px;
}

.formInput__lable {
    font-size: 14px;
    color: black;
}

.formInput__input {
    border-radius: 3px;
    border: 1px solid #ced4da;
    outline: none;
    min-height: 35px;
    padding: 10px 15px;
    width: 70%;
    font-size: 12px;

    &:hover {
        border: 1px solid #aaaaaa;
        transition: .5s;
    }

    &:focus {
        border: 1px solid #aaaaaa;
    }
}
</style>