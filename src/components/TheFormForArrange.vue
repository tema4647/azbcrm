<template>
    <!-- диалог оформления услуги и оплаты -->
    <FormBase @closeDialog="closeDialog">
        <template v-slot:header>
            Оформить услугу
        </template>
        <template v-slot:body>
            <FormSelect :options="CLIENTS" optionFieldName="client_child_fio" lable="Клиент" v-model:select="client">
            </FormSelect>
            <FormSelect :options="SERVICES" optionFieldName="service_name" lable="Услуга" v-model:select="service">
            </FormSelect>
            <FormSelect :options="TICKETS" optionFieldName="ticket_name" lable="Абонемент" v-model:select="ticket">
            </FormSelect>
            <FormSelect :options="GROUPS" optionFieldName="group_name" lable="Группа" v-model:select="group">
            </FormSelect>
            <FormSelect :options="INDIVIDUALS" optionFieldName="individual_name" lable="Индивидуалы"
                v-model:select="individual"></FormSelect>

        </template>
        <template v-slot:footer>
            <AppButton class="btn-rounded btn-empty" @click="closeDialog">Отменить</AppButton>
            <AppButton class="btn-rounded btn-success text-white" @click="saveService">Оформить</AppButton>
        </template>
    </FormBase>
</template>

<script>
import SelectionList from "@/components/SelectionList"
import FormBase from '@/components/Form/FormBase'
import FormInput from '@/components/Form/FormInput'
import AppButton from '@/components/ui/AppButton.vue'
import FormSelect from '@/components/Form/FormSelect'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        SelectionList,
        FormBase,
        FormInput,
        AppButton,
        FormSelect
    },
    data() {
        return {
            client: null,
            service: null,
            ticket: null,
            individual: null,
            group: null,

            clientId: null,
            clientSet: {
                group_id: null,
                ticket_id: null,
                individual_id: null
            }

        }
    },


    computed: {
        ...mapGetters([
            "GROUPS",
            "CLIENTS",
            "INDIVIDUALS",
            "SERVICES",
            "TICKETS"
        ]),

    },

    methods: {
        ...mapActions([
            "GET_GROUPS",
            "GET_CLIENTS",
            "GET_INDIVIDUALS",
            "GET_SERVICES",
            "GET_TICKETS"
        ]),
        closeDialog(){
            this.$emit('closeDialog')
        },

        saveService() {
            this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientSet])
            this.$emit('saveForm')
        }
    },

    mounted() {
        this.GET_GROUPS()
        this.GET_CLIENTS()
        this.GET_INDIVIDUALS()
        this.GET_SERVICES()
        this.GET_TICKETS()
    },
    watch: {
        client(client) {
            this.clientId = client.id
            // console.log(this.clientId);

        },
        group(group) {
            this.clientSet.group_id = group.id
            // console.log(this.clientSet.group_id);
        },

        ticket(ticket) {
            this.clientSet.ticket_id = ticket.id
            console.log(this.clientSet.ticket_id);
        },
        individual(individual) {
            this.clientSet.individual_id = individual.id
            // console.log(this.clientSet.ticket_id);
        }
    }
}
</script>

<style lang="scss" scoped></style>