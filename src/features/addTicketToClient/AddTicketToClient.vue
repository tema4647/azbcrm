<template>
    <FormBase @closeDialog="closeDialog">
        <template #header>
            Добавить абонемент
        </template>
        <template #body>
            <FormSelect v-model:select="selectedTicket" :options="TICKETS" optionFieldName="ticket_name"
                lable="Абонемент">
            </FormSelect>
            <div class="warning" v-if="isWarning">
                {{ client.client_child_fio }} уже имееет такой абонемент!
            </div>
            <div v-else="!isWarning" class="formResult"><span>К оплате:</span><span class="formResult_number">{{ new
                Number(currentResultPayment).toFixed() }}</span></div>
        </template>
        <template #footer>
            <div class="button-group">
                <AppButton class="btn-rounded btn-empty" @click="closeDialog">Отменить</AppButton>
                <AppButton class="btn-rounded btn-success text-white" @click="addTicket" :disabled="!disabled">Оплатить
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

import dayjs from 'dayjs'
import dayjs_ru from 'dayjs/locale/ru.js'

dayjs.locale('ru')

export default {
    components: {
        FormBase,
        AppButton,
        FormSelect
    },
    emits: ['closeDialog'],
    props: {
        client: {
            type: Object
        },
    },
    data() {
        return {
            isWarning: false,
            selectedTicket: null,
            clientId: this.client.id,
            currentResultPayment: null,
            currentDate: dayjs().format('YYYY-MM-DD'),
            clientsList: {
                ticket_id: null,
                ticket_count: null,
                ticket_current_amount: null
            },
            transactionList: {
                client_id: null,
                transaction_type: 'зачисление',
                transaction_reason: 'покупка абонемента',
                transaction_account: 'абонемент',
                transaction_amount: 0.00,
                transaction_date: null
            },
        }
    },
    computed: {
        disabled() {
            return Object.values(this.clientsList).every(item => item) && this.isWarning == false
        },
        ...mapGetters([
            "TICKETS",
            "TRANSACTIONS"

        ])
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        },
        addTicket() {
            this.$store.dispatch('SET_TRANSACTIONS', this.transactionList)
            this.$store.dispatch('PUT_CLIENT', [this.clientId, this.clientsList])
            this.closeDialog()
        },
        ...mapActions([
            'GET_TICKETS',
            "GET_TRANSACTIONS"
        ])
    },
    watch: {
        selectedTicket(selectedTicket) {
            if (this.client.tickets.some(item => item.id == selectedTicket.id)) {
                this.isWarning = true
            } else {
                this.isWarning = false
                this.clientsList.ticket_id = selectedTicket?.id
                this.clientsList.ticket_count = selectedTicket?.ticket_visits
                this.clientsList.ticket_current_amount = selectedTicket?.ticket_cost

                this.transactionList.client_id = this.client.id
                this.transactionList.transaction_amount = selectedTicket?.ticket_cost
                this.transactionList.transaction_date = this.currentDate
                this.currentResultPayment = selectedTicket?.ticket_cost
            }
        }
    },

    mounted() {
        this.GET_TICKETS()
        this.GET_TRANSACTIONS()
    },

}
</script>

<style lang="scss" scoped>
.warning {
    font-size: 11px;
    color: var(--danger-color);
    display: flex;
    justify-content: end;
}

.formResult {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #000000;
    border-bottom: 1px solid #ced4da;
    padding-bottom: 5px;
}

.formResult_number {
    font-size: 20px;
    font-weight: 500;
}

.button-group {
    display: flex;
    gap: 10px;
}
</style>