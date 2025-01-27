<template>
    <div class="widget">
        <div class="widget__title">{{items.title}}</div>
        <div class="widget__number">{{items.number}}</div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.widget {
    width: 200px;
    height: 200px;
    box-shadow: 0px 0px 22px -11px rgba(34, 60, 80, 0.31);
    border-radius: 5px;
    background-color: #EDEDED;
    font-weight: 600;
    font-size: 11px;
    text-align: left;
    padding: 15px;
    display: flex;
    flex-direction: column;
    color: #2E3743;
    overflow: hidden;
}

.widget__title {
    flex: 0 1 10%;
    text-transform: uppercase;
}

.widget__number {
    flex: 0 1 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    font-size: 25px;
}
</style>