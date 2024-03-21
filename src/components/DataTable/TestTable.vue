<!-- ПРИМЕР НАПИСАНИЯ КОМПОНЕНТА ТАБЛИЦЫ, НЕ ЗАБЫТЬ УДАЛИТЬ -->



<template>
    <table>
        <tr>
            <slot v-for="(column, index) in columns" :name="`header_${column.key}`" :header="column">
                <th :key="index">
                    {{ column.label }}
                </th>
                
            </slot>
            <!-- <slot name="header.action" v-if="isActions">
                <th>Action</th>
            </slot> -->
        </tr>
        <tr v-for="(entity, index) in entities" :key="`entity.${index}`">
            <slot v-for="(column, index) in columns" :name="`column_${column.key}`" :entity="entity">
                <td :key="`column.${index}`">
                    {{ entity[column.key] }}
                </td>
            </slot>
       </tr>
        
            <!-- <slot name="column_actions" :entity="entity" v-if="isActions">
                <td>
                    <button @click="onEdit(entity)">Edit</button>
                    <button @click="onDelete(entity)">Delete</button>
                </td>
            </slot> -->
        

    </table>
</template>

<script>
export default {
    name: 'TestTable',
    props: {
        columns: {
            required: true
        },
        entities: {
            required: true
        },
        isActions: {
            required: false,
            default: true,
            type: Boolean
        }
    },
    methods: {
        onEdit(entity) {
            this.$emit('onEdit', entity);
        },
        onDelete(entity) {
            this.$emit('onDelete', entity);
        }
    }
}
</script>

<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>