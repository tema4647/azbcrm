<!-- select -->
<template>
    <div class="formSelect">
        <div class="formSelect__header">
            <!-- подпись поля select -->
            <div class="formSelect__lable">{{ lable }}</div>
            <!-- select -->
            <div class="formSelect__select" @click="handlerClick"> {{ currentOption }}
                <div class="formSelect__content" v-if="contentVisible">
                    <div class="content__options" @click="selectOption(option)" v-for="option of options" :key="option.id">
                        {{ option.group_name }}
                    </div>
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
        }
    },
    data() {
        return {
            contentVisible: false,
            currentOption: 'выбрать группу'
        }
    },

    computed: {

    },
    methods: {
        handlerClick() {
            this.contentVisible = !this.contentVisible;
        },

        selectOption(option) {
            this.$emit('update:select', option)
        }

    }
}
</script>

<style lang="scss" scoped>
.formSelect {
    justify-content: space-between;
    margin-bottom: 15px;

}

.formSelect__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 3px;

}

.formSelect__lable {
    font-size: 14px;
}

.formSelect__select {
    position: relative;
    border-radius: 3px;
    border: 1px solid #ced4da;
    min-height: 30px;
    padding: 5px;
    width: 70%;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;

    &:hover {
        border: 1px solid #609af8;
    }

    &:focus {
        box-shadow: 0px 0px 2px 1px #609af8;
        border: 1px solid #609af8;
    }
}

.formSelect__content {
    position: absolute;
    top: 31px;
    left: -1px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 3px;
    border: 1px solid #ced4da;
    width: 100%;
    font-size: 12px;
    padding: 10px 0px;

}

.content__options {
    width: 100%;
    text-align: left;
    padding: 7px 10px;
    cursor: pointer;

    &:hover {
        background-color: var(--grey-color);
    }
}</style>