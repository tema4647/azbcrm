<template>
    <div class="clientData">
        <div class="clientData__header">
            <div class="clientData__closeButton" @click="handleClick"></div>
        </div>
        <div class="clientData__body">
            <div class="clientData__body-part">
                <div class="part-title">Личная информация</div>
                <div class="part-item__wrapper">
                    <div class="part-item border-bottom flex-row space-between">
                        <div class="part-item__title">Ф.И.О</div>
                        <div class="part-item__value">{{ client.client_child_fio }}</div>
                    </div>
                    <div class="part-item border-bottom flex-row space-between">
                        <div class="part-item__title">Дата рождения</div>
                        <div class="part-item__value">{{ client.client_child_birth }}</div>
                    </div>
                    <div class="part-item border-bottom flex-row space-between">
                        <div class="part-item__title">Родитель</div>
                        <div class="part-item__value">{{ client.client_parent_fio }}</div>
                    </div>
                    <div class="part-item border-bottom flex-row space-between">
                        <div class="part-item__title">Телефон</div>
                        <div class="part-item__value">{{ client.client_parent_phone }}</div>
                    </div>
                    <div class="part-item border-bottom flex-row space-between">
                        <div class="part-item__title">Email</div>
                        <div class="part-item__value">{{ client.client_parent_email }}</div>
                    </div>
                </div>

            </div>
            <div class="clientData__body-part">
                <div class="clientData__part-wrapper">
                    <div class="part-title ">Услуги</div>
                    <div class="part-item__wrapper">
                        <div class="part-item">
                            <div class="part-item__title border-bottom">Индивидуальные занятия</div>
                            <div class="flex-row tickets" v-for="individual in client.individuals" :key="individual.id">
                                <div class="part-item__value"> {{ individual.individual_name }} </div>
                                <font-awesome-icon icon="fa-solid fa-chevron-right" />
                                <div class="part-item__value"> {{ individual.services.service_name }}</div>
                            </div>
                        </div>
                        <div class="part-item">
                            <div class="part-item__title border-bottom">Групповые занятия</div>
                            <div class="flex-row tickets" v-for="group in client.groups" :key="group.id">
                                <div class="part-item__value"> {{ group.group_name }}</div>
                                <font-awesome-icon icon="fa-solid fa-chevron-right" />
                                <div class="part-item__value"> {{ group.services.service_name }}</div>
                            </div>
                        </div>
                        <div class="part-item flex-column">
                            <div class="part-item__title border-bottom">Абонементы</div>
                            <div class="flex-row tickets" v-for="ticket in client.tickets" :key="ticket.id">
                                <div class="part-item__value"> {{ ticket.ticket_name }}</div>
                                <div class="part-item__value"> {{ ticket.ticket_cost }}\{{ ticket.ticket_current_amount
                                    }}</div>
                                <div class="part-item__value"> {{ ticket.visit_cost }}</div>
                                <div class="part-item__value"> {{ ticket.ticket_discount }}</div>
                                <div class="part-item__value"> {{ ticket.ticket_visits }}\{{ ticket.ticket_count }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clientData__part-wrapper">
                    <div class="part-title border-bottom">Посещения</div>
                    <div class="part-item__wrapper">
                        <div class="part-item flex-column">
                            <div class="flex-row tickets" v-for="visit in client.visits" :key="visit.id">
                                <div class="part-item__value">{{ visit.groups?.group_name ||
                                    visit.individuals?.individual_name }}</div>
                                <div class="part-item__value">{{ visit.services.service_name }}</div>
                                <div class="part-item__value">{{ visit.visit_date }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clientData__body-part">
                <div class="part-title">Деньги</div>
                <div class="part-item__wrapper">
                    <div class="part-item flex-row space-between">
                        <div class="part-item__title border-bottom">Денежные средства</div>
                        <div class="part-item__value">{{ new Number(client.client_parent_amount).toFixed() }} руб.</div>
                    </div>
                    <div class="part-item flex-row space-between">
                        <div class="part-item__title border-bottom">Деньги в абонементах</div>
                        <div class="part-item__value">{{ ticketAmountReduce }} руб.</div>
                    </div>
                </div>

                <div class="clientData__part-wrapper">
                    <div class="part-title border-bottom">Поступления, списания, возвраты</div>
                    <div class="part-item__wrapper">
                        <div class="part-item flex-column">
                            <div class="flex-row tickets" v-for="transaction in client.transactions"
                                :key="transaction.id">
                                <div class="part-item__value">{{ transaction.transaction_type }}</div>
                                <div class="part-item__value">{{ transaction.transaction_reason }}</div>
                                <div class="part-item__value">{{ transaction.transaction_account }}</div>
                                <div class="part-item__value">{{ transaction.transaction_amount }}</div>
                                <div class="part-item__value">{{ transaction.transaction_date }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="clientData__footer">
        </div>
    </div>
</template>

<script>

export default {

    name: 'ClientData',
    components: {
    },
    props: {
        client: {
            type: Object
        }
    },

    data() {
        return {

        }
    },

    computed: {
        ticketAmountReduce() {
            const tickets = this.client.tickets.map(tickets => tickets)
            const ticketAmountReduce = tickets.reduce((acc, arr) => {
                return acc + arr.ticket_current_amount
            }, 0)

            return ticketAmountReduce
        },

    },

    methods: {
        handleClick() {
            this.$emit('closeClientData')
        }
    },

}
</script>

<style lang="scss" scoped>
.clientData {
    width: 90%;
    height: 90%;
    box-shadow: 0px 0px 20px rgb(82, 78, 78);
    z-index: 100;
    background-color: white;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: grid;
    grid-auto-rows: minmax(50px, auto);

}

.clientData__header {
    padding: 16px 20px;
    display: flex;
    justify-content: end;
}

.clientData__body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 50px;

    padding: 16px 70px;

}

.clientData__footer {
    padding: 16px 20px;
    display: flex;
    justify-content: end;
}

.clientData__body-part {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.clientData__part-wrapper {

    margin-bottom: 30px;
}


.part-title {
    font-size: 20px;
    text-align: left;
    font-weight: 500;
    margin-bottom: 20px;


}

.part-item__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: left;
    gap: 15px;
    overflow: auto;
    width: 100%;
    height: 300px;
    font-size: 14px;

}

.part-item__wrapper::-webkit-scrollbar {
    width: 0px;
}


.border-bottom {
    border-bottom: 1px solid rgb(238, 238, 238);
    padding-bottom: 5px;
}

.flex-column {
    display: flex;
    flex-direction: column;
}

.flex-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.space-between {
    justify-content: space-between;
}


.tickets {
    background-color: rgb(248, 248, 247);
    margin-top: 5px;
    padding: 5px;

    .part-item__value {
        width: 70px;
        overflow: hidden;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
    }
}




.clientData__closeButton {
    width: 20px;
    height: 20px;
    border: 2px solid #609af8;
    border-radius: 100%;
    cursor: pointer;
}
</style>