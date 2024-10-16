<template>
    <AppBase>
        <div class="table-wrapper">
            <div class="table-header">
                <slot name="header"></slot>
            </div>
            <div class="table-body">
                <table class="table">
                    <thead class="table__head">
                        <tr class="table__head-row">
                            <th class="table__head-title" v-for="header in headers" :key="header.key">
                                {{ header.label }}
                            </th>
                        </tr>
                    </thead>

                    <tbody class="table__body">
                        <template v-for="item in items" :key="item.id">
                            <tr class="table__body-row">
                                <td class="table__body-cell" v-for="header in headers" :key="header.key">
                                    {{ item[header.key] }}
                                </td>
                                <div class="button-wrapper">
                                    <button class="row-button" @click="handleClick(item)">
                                        <font-awesome-icon class="row-icon" icon="pen-to-square" />
                                    </button>
                                    <button class="row-button" @click="handleClick2(item)">
                                        <font-awesome-icon class="row-icon" icon="circle-xmark" />
                                    </button>
                                </div>
                            </tr>
                        </template>
                    </tbody>
                </table>

            </div>
            <div class="table-footer"></div>
        </div>

    </AppBase>
</template>

<script>
import AppBase from '@/components/ui/AppBase.vue'
import Search from '@/components/DataTable/Search.vue'



export default {
    name: 'DataTable',
    components: {
        AppBase,
        Search
    },

    emits: ['editItem', 'deleteItem'],

    props: {
        items: {
            type: Array,
        },

        headers: {
            type: Array,
        },
    },

    data() {
        return {}
    },

    methods: {
        handleClick(item){
            this.$emit('editItem', item)
        },
        handleClick2(item) {
            this.$emit('deleteItem', item)
        }
    },


}
</script>

<style lang="scss" scoped>
.table-wrapper {}

.table-header {
    height: 60px;
    background-color: #f8f9fa;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 10px;
}

.table {
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    font-size: 14px;

}


.table__head {
    width: 100%;
    height: 30px;
    position: sticky;
    top: 60px;
    left: 0;
    background-color: white;
    z-index: 1;
}

.table__head-row {
    width: 100%;
    border-bottom: 1px solid #dee2e6;
}

.table__head-title {
    text-align: left;
    color: #334155;
    padding: 15px;
    text-align: left;
    font-weight: 600;

}

.table__body {}


.table__body-row {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #dee2e6;
    position: relative;

}

.table__body-cell {
    text-align: left;
    padding: 15px;
    color: #334155;

}

.button-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 90px;
    display: flex;
    gap: 15px;
    padding: 15px;
    -webkit-box-shadow: -5px 0px 8px 0px rgba(34, 60, 80, 0.09);
    -moz-box-shadow: -5px 0px 8px 0px rgba(34, 60, 80, 0.09);
    box-shadow: -5px 0px 8px 0px rgba(34, 60, 80, 0.09);
}


.row-button {
    // width: 17px;
    // height: 17px;
    cursor: pointer;
    background-color: inherit;

}

.row-icon{
    color: rgb(192, 192, 192);
    font-size: 18px;
    transition: .5s;
}

.row-icon:hover{
    color: rgb(121, 121, 121);
    transition: .5s;
}
</style>
