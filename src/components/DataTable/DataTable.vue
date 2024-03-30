<template>
    <AppBase>
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
                        <button class="row-delete btn-round btn-danger" @click="handleClick(item)"></button>
                    </tr>
                </template>
            </tbody>
        </table>
    </AppBase>
</template>

<script>
import AppBase from '@/components/ui/AppBase.vue'


export default {
    name: 'DataTable',
    components: {
        AppBase,
    },

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
        handleClick(item) {
            this.$emit('deleteGroup', item)
        }
    },

    computed: {},
}
</script>

<style lang="scss" scoped>
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
    top: 0;
    left: 0;
    background-color: #f8f9fa;

}

.table__head-row {
    width: 100%;
    border-bottom: 1px solid #dee2e6;
}

.table__head-title {
    text-align: left;
    color: #343a40;
    padding: 15px;
    text-align: left;

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
}

.row-delete {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 17px;
    height: 17px;
    cursor: pointer;
}
</style>
