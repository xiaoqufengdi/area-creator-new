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
        computed: {

        },
        mounted(){
            console.log(this.$router);
        },
        components: {Header}
    }
</script>
<style scoped  lang="less">
    @import "../style/theme.less";
    .hc-base-content{
        width: 100%;
        height: 100%;
    }
    .hc-base-header{
        padding: 0;

    }
    .hc-base-main{
        background: @color-background;
        padding: 10px 0px 0px;
    }

</style>
