<template>
    <el-container class="hc-base-content">
        <el-header class="hc-base-header">
            <Header></Header>
        </el-header >
        <el-main class="hc-base-main">
            <router-view></router-view>
        </el-main>
    </el-container>
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
    .hc-base-content{
        width: 100%;
        height: 100%;
    }
    .hc-base-header{
        padding: 0;

    }
    .hc-base-main{
        background: #F5F5F5;
    }

</style>
