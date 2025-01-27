<template>
    <div class="formSelect" hidden>
        <!-- подпись поля select -->
        <label class="formSelect__lable">{{ lable }}</label>
        <!-- select -->
        <div class="formSelect__select" @click="openContent"> {{ currentOption }}
            <div class="formSelect__content" v-if="isContent">
                <div class="select-option" @click="selectOption(option)" v-for="option of options" :key="option.id">
                    {{ option[optionFieldName] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormSelect',
    props: {
        lable: {
            type: String
        },
        options: {
            type: Array
        },

        optionFieldName: {
            type: String
        }
    },
    data() {
        return {
            isContent: false,
            currentOption: 'Выбрать'
        }
    },


    methods: {
        openContent() {
            this.isContent = !this.isContent;
        },

        selectOption(option) {
            this.currentOption = option[this.optionFieldName]
            this.$emit('update:select', option)
        }
    }
}
</script>

<style lang="scss" scoped>
.formSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 17px;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
}


.formSelect__lable {
    font-size: 14px;
    color: black;
}


.formSelect__select {
    position: relative;
    border-radius: 3px;
    border: 1px solid #ced4da;
    min-height: 35px;
    padding: 10px 15px;
    width: 70%;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    background-color: white;
    outline: none;
    color: #757575;

    &:hover {
        border: 1px solid #aaaaaa;
        transition: .5s;
    }

    &:focus {
        border: 1px solid #aaaaaa;
    }
}

.formSelect__content {
    position: absolute;
    top: 40px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 3px;
    border: 1px solid #ced4da;
    width: 100%;
    font-size: 12px;
    background-color: white;
    z-index: 1;

}

.select-option {
    width: 100%;
    text-align: left;
    padding: 7px 10px;
    cursor: pointer;
    padding: 10px 15px;

    &:hover {
        background-color: var(--grey-color);
    }
}
</style>