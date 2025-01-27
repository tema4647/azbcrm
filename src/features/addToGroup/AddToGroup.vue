<template>
    <FormBase @closeDialog="closeDialog">
        <template #header>
            Добавить группу
        </template>
        <template #body>
            <FormSelect v-model:select="selectedGroup" :options="GROUPS" optionFieldName="group_name" lable="Группа">
            </FormSelect>
            <div class="warning" v-if="isWarning">
                {{ client.client_child_fio }} уже состоит в группе {{ selectedGroup.group_name }}
            </div>
        </template>
        <template #footer>
            <div class="button-group">
                <AppButton class="btn-rounded btn-empty" @click="closeDialog">Отменить</AppButton>
                <AppButton class="btn-rounded btn-success text-white" @click="addGroup" :disabled="!disabled">Сохранить
                </AppButton>
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
    name: 'AddToGroup',
    components: {
        FormBase,
        AppButton,
        FormSelect
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
            selectedGroup: '',
            clientId: this.client.id,
            clientsList: {
                group_id: null
            }
        }
    },
    computed: {
        disabled() {
            return Object.values(this.clientsList).every(item => item) && this.isWarning == false
        },
        ...mapGetters([
            "GROUPS"
        ])
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
            this.clientsList.selectedGroup = ''
            this.clientId = null
        },
        addGroup() {
            this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientsList])
            this.closeDialog()
        },
        ...mapActions([
            'GET_GROUPS'
        ])
    },
    mounted() {
        this.GET_GROUPS();
    },

    watch: {
        selectedGroup(selectedGroup) {
            if (this.client.groups.some(item => item.id == selectedGroup.id)) {
                this.isWarning = true
            }else{
                this.isWarning = false
                this.clientsList.group_id = this.selectedGroup.id
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