<template>
    <el-container class="hc-reader-login__logo" v-loading="loading">
        <el-main class="hc-reader-login_main">
            <el-container class="hc-reader-login_center">
                <el-aside class="hc-reader-login_aside" style="width: 50%;">
                </el-aside>
                <el-main>
                    <div class="hc-reader_title" >
                        <h2 class="hc-reader-login_title">欢迎登录学情观察室系统</h2>
                    </div>
                    <div class="hc-reader-login">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="账户" prop="name">
                                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="code" style="text-align:left;">
                                <el-input type="text" style="width:60%;" v-model="ruleForm.code"></el-input>
                                <div class="capture_code">
                                    <img src="../assets/ic_code.png" ref="codeImg" @click="handleChangeCode"  alt="验证码图片"/>
                                </div>
                            </el-form-item>
                 <!--           <el-form-item style="margin-left: 0px;">
                                <el-button @click="login('ruleForm')" class="hc-reader-login__button" size="large" type="primary">登录
                                </el-button>
                            </el-form-item>-->
                        </el-form>
              <!--          <div class="hc-reader-login__input-wrap" style="text-align:left;">
                            <a class="forgetPassword" href="##" >忘记密码？</a>
                        </div>-->
                        <!--        <div class="hc-reader-login__input-wrap hc-reader-login__input-wrap--left">
                                    <el-checkbox @change="(value)=>{if(!value)this.autoLogin=false;}" v-model="rememberPass">记住密码
                                    </el-checkbox>
                            </div>
                                <div class="hc-reader-login__input-wrap hc-reader-login__input-wrap&#45;&#45;left">
                                    <el-checkbox @change="(value)=>{if(value)this.rememberPass=true;}" v-model="autoLogin">自动登录
                                    </el-checkbox>
                                </div>-->
                    </div>
                    <div class="hc-reader-login">
                        <el-button @click="login" class="hc-reader-login__button" size="large" type="primary">登录</el-button>
                    </div>
                </el-main>
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
            let checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
/*
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
*/
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('name');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    }  else {
                        callback();
                    }
            };

            return {
                ruleForm: {
                    name: 'admin',
                    password: '',
                    code: 'Ejdi'
                },
                rules: {
                    name: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    code: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                },

                rememberPass: true,
                loading: false
            }
        },
        methods: {

            async login(formName) {
                console.log(formName);

                if (!this.ruleForm.name || !this.ruleForm.password) {
                    try {
                        await this.$alert("请输入用户名或者密码！");
                    } catch (e) {
                        console.log(e)
                    }
                    return;
                }
                if(!this.ruleForm.code){
                    this.$alert("请输入验证码");
                    return;
                }
                this.loading = true;

                //测试代码
                setTimeout(()=>{
                    this.loading = false;
                }, 1000);
                if (this.rememberPass) {
                    ConstJsonManager.set("login", {name: this.ruleForm.name, password: this.ruleForm.password, code: this.ruleForm.code, token: "abcddskskskk" })
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

            //切换验证码
            handleChangeCode(event){

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
    .hc-reader-login input.el-input__inner{
        background:rgba(245,250,255,1);
        border-radius:5px;
    }
</style>
<style scoped  lang="less">
    @import "../style/theme.less";
    .hc-reader-login__logo{
        background:  url("../assets/ic_bg@2x.png") no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
    }
    .hc-reader-login_main{
        height: 100%;
    }

    .hc-reader-login_center{
        /*background:  url("../assets/pic_pg_login@2x.png") no-repeat;*/
        /*background-size: 100%;*/
        background-color: white;
        width: 70%;
        height: 80%;
      /*  min-width: 800px;
        min-height: 421px;*/
        margin: 0 auto;
        position: relative;
        top: 10%;
    }
    .hc-reader-login_aside{
        background:  url("../assets/pic_teacher@2x.png") no-repeat;
        background-size: cover;
        height: 100%;
        /*width: 55%;*/
    }
    .hc-reader_title{
        margin: 100px auto 30px;
        width: 75%;
        .hc-reader-login_title{
            height:51px;
            white-space: nowrap;
            font-size:36px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(85,144,248,1);
            line-height: 57px;
            margin: 0 auto;
        }
    }

    .hc-reader-login{
        width: 75%;
        margin: 50px auto;

        .el-form{
            .el-form-item{
                margin: 30px auto;
            }
        }

    }
/*    .hc-reader-login__input-wrap{
        margin: 25px auto;
    }*/

    .hc-reader-login__button{
        position: relative;
        top: 30px;
        width: 100%;
        border-radius: 20px;
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

    .capture_code{
        position: relative;
        display: inline-block;
        top: 10px;
        width: 38%;
        padding: auto 5px;
        box-sizing: border-box;
        text-align: right;
    }

</style>
