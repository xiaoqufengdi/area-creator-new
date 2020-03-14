<template>
        <el-row class="hc-header">
            <el-col :xs="1" :md="2" :lg="3"> </el-col>
            <el-col :xs="6" :md="5" :lg="4" ><img class="hc-header-logo"  src="../../assets/logo.png" alt="pic"><div class="hc-header-title">三有果教育管理系统</div> </el-col>
            <el-col :xs="16" :md="15" :lg="14">
                <el-row class="hc-header-center"  ><!-- style="border: 0.5px solid orange !important;"-->
                    <el-col :span="18">
                        <!--菜单区域-->
                        <el-menu class="hc-header-menu"
                                 :default-active="menus.length ? menus[menus.length -1].name: null"
                                 mode="horizontal"
                            @select="handleSelect"    text-color="#FFFFFF"   active-text-color="#000000"
                        >
                            <template v-for="(item, index) in menus">
                                <el-menu-item :index="item.name"  :key="index">
                                    <span>{{  item.title }}</span>
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </el-col>
                    <el-col :span="6" style="text-align:right;">
                        <img class="hc-header-nav_img"
                             src="../../assets/ic_person@2x.png"/>
                        <el-popover
                                placement="bottom"
                                width="100"
                                trigger="click">
                            <el-menu   @select="handleSelect"  class="el-menu-sub"
                            >
                                <el-menu-item index="login" tabindex="-1">退出</el-menu-item>
                            </el-menu>
                            <span slot="reference" class="hc-header-nav_name">{{"admin"}}<img class="hc-header_img_arrow" src="../../assets/ic_arrow_white@2x.png" alt=""></span>
                        </el-popover>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs="1" :md="2" :lg="3"></el-col>
        </el-row>
</template>
<script>
    export default {
        data() {
            return {
//                activeMenuIndex: "0"
            }
        },
        created(){
            console.log(this.$route);

            //console.log(this.$store.state.member.currentMenus);

        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.$router.push({ name: key })//,params: { userId: '123' }
            }
        },
        computed: {
            menus(){
                console.log(this.$store.state.member.currentMenus);
                return this.$store.state.member.currentMenus.length ? this.$store.state.member.currentMenus : this.$router.push({path: "/login"});
            }

        },
        components: {

        }
    }

</script>
<style scoped lang="less">
    @import "../../style/theme.less";

    .hc-header{
        height: 100%;
        background: @color;
        font-size:16px;
        /*font-family:Microsoft YaHei;*/
        font-weight:400;
        color: @color-font;
    }
    .hc-header .el-col{
        height: 100%;
        line-height: 100%;
    }
    .hc-header-logo{
        position:relative;
        top: 8px;
        width: 24px;
        height: 24px;
        margin: 0 10px;
    }
    .hc-header-title{
        display: inline-block;
        height: 100%;
        line-height: 100%;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }
    .hc-header-title::before{
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
    }
    .hc-header-center, .hc-header-center .el-col{
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
/*    .hc-header-nav_name{

    }*/
    .hc-header_img_arrow{
        margin: 0 5px;
    }
    .el-menu-sub{
        text-align: center;
    }
    .hc-header .el-menu{
        background-color: @color;
    }
    .hc-header-menu{
        height: 100%;
        line-height: 100%;
        box-sizing: border-box;
        border-bottom: none;
        float: right;
        background-color: @color;/*rgba(27,148,255,1)*/
        .el-menu-item:hover{
            background-color: @color-hover;
        }
        .is-active{
            background-color: @color-selected !important;
            border-bottom:none;
            color:@color-font !important;
        }
        li{
            width:100px;
            border-bottom: none;
        }
    }
</style>
