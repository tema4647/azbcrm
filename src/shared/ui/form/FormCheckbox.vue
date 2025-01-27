<!-- checkbox -->
<template>
    <div class="formInput">
        <input class="formInput__checkbox"  v-model="model" :value="value" type="checkbox">
        <div class="formInput__lable">{{ lable }}</div>
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        lable: {
            type: String
        },
        modelValue: {
            type: [Boolean]
        },
        value: {
            type: [Boolean]
        },
    },

    computed: {
        model: {
            get() {
                return this.modelValue;
            },

            set(value) {
                this.$emit("update:modelValue", value);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


.formInput {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 7px;
}

.formInput__lable {
    font-size: 14px;
    color: black;
}

.formInput__checkbox {
    border-radius: 3px;
    border: 1px solid #ced4da;
    outline: none;
    width: 15px;
    height: 15px;
    cursor: pointer;
    accent-color: #16A34A;
    border: 1px solid red;

    &:hover {
        border: 1px solid #aaaaaa;
        transition: .5s;
    }

    &:focus {
        border: 1px solid #aaaaaa;
    }
}
</style>