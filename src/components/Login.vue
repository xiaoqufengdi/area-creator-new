<template>
    <el-container class="hc-reader-login__logo" v-loading="loading">
        <el-main class="hc-reader-login_main">
            <el-container class="hc-reader-login_center">
                <el-aside class="hc-reader-login_aside" style="width: 55%;">
                </el-aside>
                <el-main>
                    <div style="margin:60px auto 25px">
                        <img alt="三有果" style="width:43px; height:50px;" src="../assets/ic_logo@2x.png"/>
                        <!--<div style="color:#403e3e;font-size: 28px;font-weight: bolder;font-family: fantasy;">三有果智能批阅系统</div>-->
                        <div class="hc-reader-login_title"><span>欢迎来到智能圈码系统</span></div>
                        <div class="hc-reader-login_title2"><span>WELCOME TO LOGIN</span></div>
                    </div>
                    <div class="hc-reader-login__input-area">
                        <div class="hc-reader-login__input-wrap">
                            <el-input class="hc-reader-login_input"
                                    placeholder="请输入用户名"
                                    v-model="name">
                            </el-input>
                        </div>
                        <div class="hc-reader-login__input-wrap">
                            <el-input
                                    placeholder="请输入密码" type="password"
                                    v-model="password">
                            </el-input>
                        </div>

                        <div class="hc-reader-login__input-wrap" style="text-align:left;">
                            <a class="forgetPassword" href="##" >忘记密码？</a>
                        </div>
                        <!--        <div class="hc-reader-login__input-wrap hc-reader-login__input-wrap--left">
                                    <el-checkbox @change="(value)=>{if(!value)this.autoLogin=false;}" v-model="rememberPass">记住密码
                                    </el-checkbox>
                            </div>
                                <div class="hc-reader-login__input-wrap hc-reader-login__input-wrap&#45;&#45;left">
                                    <el-checkbox @change="(value)=>{if(value)this.rememberPass=true;}" v-model="autoLogin">自动登录
                                    </el-checkbox>
                                </div>-->
                    </div>
                    <div class="hc-reader-login__input-area">
                        <el-button @click="login" class="hc-reader-login__button "
                                   type="primary">登录
				</el-button>
                    </div>                </el-main>
            </el-container>
        </el-main>

    </el-container>

</template>

<script>
    import  request from '../utils/request'
    import URL from "../utils/UrlConfig";
    import {ConstJsonManager} from "../utils/ConstJsonManager";
    import {mutations_const, actions_const} from "../store/StoreConstant";


    export default {
        name: "Login",
        data() {
            return {
                name: '17671716649',
                password: '123456',
                rememberPass: true,
//                autoLogin: true,
                loading: false
            }
        },
        methods: {

            async login() {
                if (!this.name || !this.password) {
                    try {

                        await this.$alert("请输入用户名或者密码！");
                    } catch (e) {
                        console.log(e)
                    }
                    return
                }
                this.loading = true;

                //测试代码
                setTimeout(()=>{
                    this.loading = false;
                }, 1000);
                if (this.rememberPass) {
                    ConstJsonManager.set("login", {name: this.name, password: this.password, token: "abcddskskskk" })
                }else{
                    ConstJsonManager.set("login", { token: res.token })
                }
                //NetUtil.updToken();
                this.$store.commit(mutations_const.GET_NAV_MENUS, 1);
                let currentMenus = this.$store.state.member.currentMenus;

                this.$router.push({path: currentMenus[currentMenus.length - 1].path});
                //this.$router.push({path: `/index/${currentMenus[0].path}`});
/*                request.account.login({telphone: this.name, password: this.password})
                    .then(res => {
                        console.log(res);
                        /!*ConstJsonManager.set('rememberPass', this.rememberPass);
                        ConstJsonManager.set('autoLogin', this.autoLogin);*!/
                        if (this.rememberPass) {
                            ConstJsonManager.set("login", {name: this.name, password: this.password, token: res.token })
                        }else{
                            ConstJsonManager.set("login", { token: res.token })
                        }

                        NetUtil.updToken();
                        this.$router.push({path: '/base-content/reader-monitoring'})
                    })
                    .catch(err => {
                        console.error(err)
                    })
                    .finally(() => {
                        this.loading = false;
                    })*/
            },

            keyUp(e) {
                if (e.code === 'Enter' && !(!this.name || !this.password)) {
                    this.login();
                }
            }
        },
        created() {

            /*remote.getCurrentWindow().maximize();
            remote.getCurrentWindow().show();*/
           /* this.$store.commit(mutations_const.RESET_LOGIN_MEMBER, {});

            Promise.all([ConstJsonManager.get('rememberPass'), ConstJsonManager.get('password'), ConstJsonManager.get('name'), ConstJsonManager.get('autoLogin')].map(p => p.catch(e => e)))
                .then(res => {
                    if (res[0]) {
                        this.autoLogin = res[3];
                        this.name = res[2];
                        this.password = res[1];
                        this.rememberPass = res[0];
                        if (res[3] && res[2] && res[1] && res[2] !== '' && res[1] !== '' && (this.isToShow === true || navigator.onLine)) {
                            this.login();
                        }
                    } else if (res[2]) {
                        this.name = res[2];
                    } else {

                    }
                })*/
        },
        mounted() {
            document.body.addEventListener('keyup', this.keyUp);
        },
        beforeRouteLeave(to, from, next) {
            document.body.removeEventListener('keyup', this.keyUp);
            next();
        }
    }
</script>

<style>
    .hc-reader-login__input-area input.el-input__inner{
        background:rgba(245,250,255,1);
        border-radius:5px;
    }
</style>
<style scoped  lang="less">
    @import "../style/theme.less";
    .hc-reader-login__logo{
        background:  @color;/*url("../assets/ic_bg@2x.png") no-repeat;*/
        background-size: 100%;
        width: 100%;
        height: 100%;
    }
    .hc-reader-login_main{
        /*margin: 100px;*/
        height: 100%;
    }

    .hc-reader-login_center{
        background:  url("../assets/pic_pg_login@2x.png") no-repeat;
        background-size: 100%;
        width: 1200px;
        height: 632px;
        min-width: 800px;
        min-height: 421px;
        margin: 0 auto;
        position: relative;
        top: calc((100% - 632px)/2)
    }
    .hc-reader-login_aside{
        width: 55%;
    }

    .hc-reader-login_title{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:@color;
        line-height:25px;
        margin: 15px auto;
    }

    .hc-reader-login_title2{
        font-size:8px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(179,179,179,1);
        line-height:25px;
        margin: 15px auto;
    }
    .hc-reader-login__input-area{
        width: 55%;
        margin: 50px auto;
    }
    .hc-reader-login__input-wrap{
        margin: 25px auto;
    }



    .hc-reader-login__button{
        width: 100%;
        border-radius: 20px;
     /*   background: url("../assets/ic_button@2x.png") no-repeat;
        background-size: 100%;*/
        background: @color;
        &:hover{
            background: @color-hover;
        }
    }
    .forgetPassword{
        width:39px;
        height:8px;
        font-size:8px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:25px;
        text-decoration: none;
    }

</style>
