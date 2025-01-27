<template>
    <FormBase @closeDialog="closeDialog">
        <template #header>
            Удалить из индивидуалов
        </template>
        <template #body>
            Вы действительно хотите удалить <strong class="capitalize">{{ client.client_child_fio }}</strong> из индивидуалов <strong class="capitalize">{{  individual.individual_name }}</strong> 
        </template>
        <template #footer>
            <div class="button-group">
                <AppButton class="btn-rounded btn-empty" @click="closeDialog">Отменить</AppButton>
                <AppButton class="btn-rounded btn-danger text-white" @click="deleteFromIndividual">Удалить</AppButton>
            </div>
        </template>
    </FormBase>
</template>

<script>
import AppButton from '@/shared/ui/buttons/AppButton.vue'
import FormBase from '@/shared/ui/form/FormBase.vue'

export default {
    name: 'DeleteFromIndividual',
    components: {
        FormBase,
        AppButton
    },
    emits: ['closeDialog'],
    props: {
        client: {
            type: Object
        },
        individual: {
            type: Object
        }
    },
    data() {
        return {
            clientId: this.client.id,
            clientsList:{
                individual_id: this.individual.id,
                detach: true
            }
        }
    },

    methods: {
        closeDialog() {
            this.$emit('closeDialog')
            this.individual_id = null
            this.clientId = null
        },

        deleteFromIndividual() {
            this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientsList])
            this.closeDialog()
        }
    }
}
</script>

<style lang="scss" scoped>
// анимация
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.button-group {
    display: flex;
    gap: 10px;
}
</style>