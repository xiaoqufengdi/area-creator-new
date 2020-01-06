<template>
    <div>
        <Header></Header>
        <router-view></router-view>
    </div>

</template>
<script>
    import Header from "./base/Header.vue"
    export default {
        data() {
            return {}
        },
        methods: {},
        computed: {},
        components: {Header}
    }
</script>
<style scoped>

</style>
