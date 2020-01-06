<template>
        <el-row class="hc-header">
            <el-col :xs="3" :md="4" :lg="5">blank </el-col>
            <el-col :xs="18" :md="16" :lg="14" style="border: 0.5px solid orange !important;">
                <el-row class="hc-header">
                    <el-col :span="4" style="text-align:left;">
                        <img class="hc-header-nav_img"
                             src="../../assets/ic_person@2x.png"/>
                        <el-popover
                                placement="bottom"
                                width="100"
                                trigger="click">
                            <el-menu   @select="handleSelect"  class="el-menu-sub"
                            >
                                <el-menu-item index="1" tabindex="-1">退出</el-menu-item>
                            </el-menu>

                            <span slot="reference" class="hc-header-nav_name">{{"admin"}}<img class="hc-header_img_arrow" src="../../assets/ic_arrow_white@2x.png" alt=""></span>
                        </el-popover>
                    </el-col>
                    <el-col :span="20">
                        菜单区域
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs="3" :md="4" :lg="5">blank</el-col>
        </el-row>
</template>
<script>
    export default {
        data() {
            return {
                time: new Date(),
                navs: [{name: "选题-组建作业", path: "/content/homework/create/question-select", clickable: false}
                    , {name: "批阅-生成评测", path: "/content/homework-list", clickable: true}],
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed: {
     /*       name: function () {
                return this.$store.getters.loginMemberName
            }*/
        },
        components: {}
    }

</script>
<style scoped>
    .hc-header{
        height: 100%;
        background:rgba(27,148,255,1);

        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color: rgba(255,255,255,1)
    }
    .hc-header .el-col{
        height: 100%;
        line-height: 100%;
    }
    .hc-header-nav_img{
        width: 40px;
        height: 40px;
        background-size: 100%;
        position: relative;
        top: calc(50% - 20px);
        margin: 0 10px;
    }
    .hc-header-nav_name{

    }
    .hc-header_img_arrow{
        margin: 0 5px;
    }
    .el-menu-sub{
        text-align: center;
    }

</style>
