<template>
    <div class="clientData">
        <div class="clientData__header">
            <div class="clientData__closeButton" @click="handleClick"></div>
        </div>
        <div class="clientData__body">
            <div class="clientData__body-part">
                <div class="part-title">Личная информация</div>
                <div class="part-item__wrapper">
                    <div class="part-item">
                        <div class="part-item__title">Ф.И.О</div>
                        <div class="part-item__value">{{ client.client_child_fio }}</div>
                    </div>
                    <div class="part-item">
                        <div class="part-item__title">Дата рождения</div>
                        <div class="part-item__value">{{ client.client_child_birth }}</div>
                    </div>
                    <div class="part-item">
                        <div class="part-item__title">Родитель</div>
                        <div class="part-item__value">{{ client.client_parent_fio }}</div>
                    </div>
                    <div class="part-item">
                        <div class="part-item__title">Телефон</div>
                        <div class="part-item__value">{{ client.client_parent_phone }}</div>
                    </div>
                    <div class="part-item">
                        <div class="part-item__title">Email</div>
                        <div class="part-item__value">{{ client.client_parent_email }}</div>
                    </div>
                    <div class="part-item">
                        <div class="part-item__title">Адрес проживания</div>
                        <div class="part-item__value">г.Пермь, ул.Сапфирная, 20 - кв.45</div>
                    </div>
                </div>

            </div>
            <div class="clientData__body-part">
                <div class="part-title">Продукты</div>
                <div class="part-item__wrapper">
                    <div class="part-item">
                        <div class="part-item__title">Состоит в группах</div>
                        <div class="part-item__value"></div>
                    </div>
                    <div class="part-item">
                        <div class="part-item__title">Абонементы</div>
                        <div class="part-item__value"></div>
                    </div>
                </div>

            </div>
            <div class="clientData__body-part">
                <div class="part-title">Деньги</div>
                <div class="part-item__wrapper">
                    <div class="part-item">
                        <div class="part-item__title">Денежные средства</div>
                        <div class="part-item__value">{{ client.client_parent_amount }} руб.</div>
                    </div>
                    <div class="part-item">
                        <div class="part-item__title">Абонементы на сумму</div>
                        <div class="part-item__value">7000 руб.</div>
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
        client: Object
    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        handleClick() {
            this.$emit('closeClientData')
        }
    },
    watch: {

    },

    mounted() {

    }

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
    // border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 50px;
    padding: 16px 70px;

}

.clientData__body-part {
    flex: auto;
    // border: 1px solid red;
}

.part-title {
    font-size: 20px;
    text-align: left;
    font-weight: 500;
    margin-bottom: 30px;
    // border: 1px solid red;

}

.part-item__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: left;
    gap: 15px;

    // border: 1px solid red;

}

.part-item {
    font-size: 14px;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(238, 238, 238);

}

.part-item__value {
    // font-weight: 500;

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