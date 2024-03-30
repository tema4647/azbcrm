<template>
    <div>
{{ header }}
    </div>
</template>

<script>
    export default {
        name: 'Column',
        props:{
            header: String,
            field: String
        }
    }
</script>

<style lang="scss" scoped>

</style>