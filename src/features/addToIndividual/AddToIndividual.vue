<template>
        <FormBase @closeDialog="closeDialog">
            <template #header>
                Добавить индивидуальное
            </template>
            <template #body>
                <FormSelect v-model:select="selectedIndividual" :options="INDIVIDUALS" optionFieldName="individual_name"
                lable="Индивидуальное"></FormSelect>
                <div class="warning" v-if="isWarning">
                {{ client.client_child_fio }} уже записан к преподавателю {{ selectedIndividual.individual_name }}
            </div>
            </template>
            <template #footer>
                <div class="button-group">
                    <AppButton class="btn-rounded btn-empty" @click="closeDialog">Отменить</AppButton>
                    <AppButton class="btn-rounded btn-success text-white" @click="addIndividual" :disabled="!disabled">Сохранить</AppButton>
                </div>
            </template>
        </FormBase>
</template>

<script>
import AppButton from '@/shared/ui/buttons/AppButton.vue'
import FormBase from '@/shared/ui/form/FormBase.vue'
import FormSelect from '@/shared/ui/form/FormSelect.vue'

import { mapGetters, mapActions } from 'vuex'


export default {
    name: 'AddTooIndividual',
    components: {
        FormBase,
        FormSelect,
        AppButton
    },
    emits: ['closeDialog'],
    props: {
        client: {
            type: Object
        }
    },
    data() {
        return {
            isWarning: false,
            selectedIndividual: '',
            clientId: this.client.id,
            clientsList: {
                individual_id: null
            }
        }
    },
    computed: {
        disabled() {
            return Object.values(this.clientsList).every(item => item) && this.isWarning == false
        },
        ...mapGetters([
            "INDIVIDUALS"
        ])
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
            this.clientsList.selectedIndividual = ''
            this.clientId = null
        },
        addIndividual() {
            this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientsList])
            this.closeDialog()
        },
        ...mapActions([
            'GET_INDIVIDUALS'
        ])
    },
    mounted() {
        this.GET_INDIVIDUALS();
    },

    watch: {
        selectedIndividual(selectedIndividual) {
            if (this.client.individuals.some(item => item.id == selectedIndividual.id)) {
                this.isWarning = true
            }else{
                this.isWarning = false
                this.clientsList.individual_id = this.selectedIndividual.id
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.warning {
    font-size: 11px;
    color: var(--danger-color);
    display: flex;
    justify-content: end;
}
.button-group {
    display: flex;
    gap: 10px;
}
</style>