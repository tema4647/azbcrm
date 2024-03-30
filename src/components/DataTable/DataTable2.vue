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
                    <template v-for="item in 2" :key="item.id">
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
        AppBase,
    },
    props: {
        value: {
            type: Array,
        },
        
    },

}
</script>

<style lang="scss" scoped></style>