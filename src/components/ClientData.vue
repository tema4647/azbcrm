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
                    <div class="part-item border-bottom flex-row space-between">
                        <div class="part-item__title">Адрес проживания</div>
                        <div class="part-item__value">г.Пермь, ул.Сапфирная, 20 - кв.45</div>
                    </div>
                </div>

            </div>
            <div class="clientData__body-part">
                <div class="clientData__part-wrapper">
                    <div class="part-title ">Продукты</div>
                    <div class="part-item__wrapper">
                        <div class="part-item">
                            <div class="part-item__title border-bottom">Состоит в группах</div>
                            <div class="flex-row tickets" v-for="group in client.groups" :key="group.id"> 
                                <div class="part-item__value"> {{ group.group_name }}</div>
                            </div>
                        </div>
                        <div class="part-item flex-column">
                            <div class="part-item__title border-bottom">Абонементы</div>
                            <div class="flex-row tickets" v-for="ticket in client.tickets" :key="ticket.id"> 
                                <div class="part-item__value"> {{ ticket.ticket_name }}</div>
                                <div class="part-item__value"> {{ ticket.ticket_cost }}</div>
                                <div class="part-item__value"> {{ ticket.ticket_discount }}</div>
                                <div class="part-item__value"> {{ ticket.ticket_visits }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clientData__part-wrapper">
                    <div class="part-title border-bottom">Посещения</div>
                    <div class="part-item__wrapper">
                        <div class="part-item" v-for="visit in client.visits" :key="visit.id">
                            <div class="part-item__title">{{ visit.visit_date }}</div>
                            <div class="part-item__value"></div>
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
                        <div class="part-item__title border-bottom">Абонементы на сумму</div>
                        <div class="part-item__value">7000 руб.</div>
                    </div>
                </div>

                <div class="part-title ">Поступления, списания</div>
                <div class="part-item__wrapper">

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.clientData__header {
    padding: 16px 20px;
    display: flex;
    justify-content: end;

}

.clientData__body {
    width: 100%;
    height: 90%;
    display: flex;
    gap: 50px;
    padding: 16px 70px;

}

.clientData__body-part {
    flex: auto;
    height: 100%;
    overflow: hidden;

}

.clientData__part-wrapper {
    margin-bottom: 30px;
    // height: 100%;
}


.part-title {
    font-size: 20px;
    text-align: left;
    font-weight: 500;
    margin-bottom: 20px;
    // border: 1px solid red;

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

.space-between{
    justify-content: space-between;
}


.tickets{
    background-color: rgb(248, 247, 247);
    margin-top: 5px ;
    padding: 5px;

    .part-item__value {
    width: 90px;
    overflow: hidden;
    // border: 1px solid red;

}
}


.clientData__footer {
    width: 100%;
    padding: 16px 20px;

}

.clientData__closeButton {
    width: 20px;
    height: 20px;
    border: 2px solid #609af8;
    border-radius: 100%;
    cursor: pointer;
}
</style>