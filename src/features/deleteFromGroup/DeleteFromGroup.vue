<template>
    <FormBase @closeDialog="closeDialog">
        <template #header>
            Удалить из группы
        </template>
        <template #body>
            Вы действительно хотите удалить <strong class="capitalize">{{ client.client_child_fio }}</strong> из группы <strong class="capitalize">{{  group.group_name }}</strong> 
        </template>
        <template #footer>
            <div class="button-group">
                <AppButton class="btn-rounded btn-empty" @click="closeDialog">Отменить</AppButton>
                <AppButton class="btn-rounded btn-danger text-white" @click="deleteFromGroup">Удалить</AppButton>
            </div>
        </template>
    </FormBase>
</template>

<script>
import AppButton from '@/shared/ui/buttons/AppButton.vue'
import FormBase from '@/shared/ui/form/FormBase.vue'

export default {
    name: 'DeleteFromGroup',
    components: {
        FormBase,
        AppButton
    },
    emits: ['closeDialog'],
    props: {
        client: {
            type: Object
        },
        group: {
            type: Object
        }
    },
    data() {
        return {
            clientId: this.client.id,
            clientsList:{
                group_id: this.group.id,
                detach: true
            }
        }
    },

    methods: {
        closeDialog() {
            this.$emit('closeDialog')
            this.group_id = null
            this.clientId = null
        },

        deleteFromGroup() {
            this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientsList])
            this.closeDialog()
        }
    }
}
</script>

<style lang="scss" scoped>

.button-group {
    display: flex;
    gap: 10px;
}
</style>