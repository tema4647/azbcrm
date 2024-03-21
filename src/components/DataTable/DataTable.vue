<template>
    <AppBase>
        <div class="dataTable">

            <table>
                <thead>
                    <tr>
                        <th v-for="header in headers" :key="header.key">
                            {{ header.label }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="item in items" :key="item.id">
                        <tr>
                            <td v-for="header in headers" :key="header.key">
                                {{ item[header.key] }}
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>

        </div>
    </AppBase>
</template>

<script>
import AppBase from '@/components/ui/AppBase.vue'


export default {
    name: 'DataTable',
    components: {
        AppBase
    },

    props: {
        items: {
            type: Array,
        },

        headers: {
            type: Array
        }

    },

    data() {
        return {
        }
    },
    methods: {

    },

    computed:{
        
       
    },
    created() {
    }


}
</script>

<style lang="scss" scoped>
.dataTable {
    width: 100%;
    height: 100%;
}

table {
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    font-size: 14px;
}

thead {
    width: 100%;
    height: 50px;
    background-color: #F8F9FA;
}

tbody {}

th {
    border-bottom: 1px solid #dee2e6;
    text-align: left;
    color: #343a40;
    padding: 15px;

}

tr {
    height: 30px;
}

td {
    border-bottom: 1px solid #dee2e6;
    text-align: left;
    padding: 15px;

}</style>