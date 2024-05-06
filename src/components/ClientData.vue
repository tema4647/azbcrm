<template>
    <div class="clientData">
        <div class="clientData__header">
            <div class="clientData__closeButton" @click="handleClick"></div>
        </div>
        <div class="clientData__body">
            <div class="clientData__body-part">
                <div class="part-title">Личная информация</div>

            </div>
            <div class="clientData__body-part">
                <div class="part-title">Услуги школы</div>

            </div>
            <div class="clientData__body-part">
                <div class="part-title">Деньги</div>

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
    padding: 16px 20px;

}

.clientData__body-part {
    flex: auto;
    // border: 1px solid red;
}

.part-title {
    font-size: 20px;
    text-align: left;
    font-weight: 500;
    // border: 1px solid red;

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