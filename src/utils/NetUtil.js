/**
 * Created by Administrator on 2020/1/3.
 */
import {ConstJsonManager } from "../utils/ConstJsonManager";
import {apiUrl} from '../utils/BaseUrlConfig'
import axios from "axios";

axios.defaults.baseURL = apiUrl;
axios.defaults.timeout = 30000;


let NetUtil = {
    isAlert: false,
    success: 200,
};
//更新token
NetUtil.updToken = () => {
    // console.log(axios.defaults.timeout);
    let token = ConstJsonManager.get("login", "token");
    NetUtil.token = token;
    axios.defaults.headers['Authorization'] = token;
};


function handleErr(res){

    if ((res.message.indexOf(`timeout of ${axios.defaults.timeout}ms exceeded`)!==-1 || res.message.indexOf(`Network Error`) !== -1) && !NetUtil.isAlert) {
        NetUtil.isAlert = true;
        vueMain.$message('网络请求超时，请检查网络后重试', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true,
            showCancelButton: false
        })
    } else {
        NetUtil.errTips(res)
    }
}


NetUtil.post = (url, params) =>{
    return new Promise((resolve, reject)=>{
        axios.post(url, params).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data);
            handleErr(err);
        })
    });
};


NetUtil.get = (url, params, oss_json) => {
    let headers = {'Cache-Control': 'no-cache'};
    return new Promise((resolve, reject)=>{
        axios.get(url+(url.slice(-5)==='.json'?'?dateId=':'&dateId=')+(new Date()).getTime(), params, headers)
        .then((res) => {
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
            if(!oss_json)
                handleErr(res)
        })
    });
};




//避免同时出现多个错误弹窗
NetUtil.errTips = (res) => {
    if (!NetUtil.isAlert)
    {
        NetUtil.isAlert = true;
        let msg = '';
        let code = '';
        console.log(res);
        if (res.response) {
            msg = res.response.data.message || '未知错误';
            code = res.response.data.code
        } else if (res.data) {
            msg = res.data.message || '未知错误';
            code = res.data.code
        } else if (res.code && res.message) {
            code = res.code;
            msg = res.message;
            if(code === 3110 || code === 3111){
                msg = '用户名或密码错误'
            }
        }else {
            msg = '未知错误';
            code = '0000'
        }
        if(msg==='未知错误' || msg==='服务器异常'){
            console.error('未知错误发生');
            return
        }
        vueMain.$alert(msg, "错误提示", {showCancelButton: false, showClose: false, center: true, type:'error'})
            .then(() => {

                NetUtil.isAlert = false;
                if (code == '8001' || code == '8000' || msg == 'token无效' || msg == 'Token无效' || msg == 'TOKEN无效' || (msg.indexOf('登录') !== -1) || (msg.indexOf('登陆') !== -1)) {
                    vueMain.$store.commit(mutations_const.RESET_LOGIN_MEMBER, {});
                    Promise.all([
                        ConstJsonManager.set("token", ""),
                        ConstJsonManager.set("rememberPass", false),
                    ].map(p => p.catch(e => e)))
                        .then(() => {

                            vueMain.$router.push("/login");

                            window.location.reload();
                        })

                }
            });
    }
};


export { NetUtil };



