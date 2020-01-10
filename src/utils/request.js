/**
 * Created by Administrator on 2020/1/3.
 */
import {ConstJsonManager } from "../utils/ConstJsonManager";
import URL from "./UrlConfig";
import {apiUrl} from '../utils/BaseUrlConfig'
import axios from "axios";

axios.defaults.baseURL = apiUrl;
axios.defaults.timeout = 30000;


const post = function (url, params, key) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                if (res.status && res.status === 200) {
                    if (key && res['data'][key]) {
                        let code = parseInt(res['data']['code']);
                        if (isNaN(code) || code === success) {
                            resolve(res['data'][key])
                        } else {
                            reject(res)
                        }
                    } else {
                        if (res.data) {
                            if (res.data.code) {
                                if (res.data.code === 200) {
                                    resolve(res['data'])
                                } else {
                                    reject(res)
                                }
                            } else {
                                resolve(res['data'])
                            }
                        } else {
                            reject(res)
                        }
                    }
                } else {

                    reject(res)
                }
            })
            .catch(err => {

                reject(err)
            })
    })
};


const request = {
    post,
    success: 200,
    account: {
        updToken:() => {
            // console.log(axios.defaults.timeout);
            let token = ConstJsonManager.get("login", "token");
            request.token = token;
            axios.defaults.headers['Authorization'] = token;
        },
        login: params=>post(URL.System.login, JSON.stringify(params))
    }
};

/*
//更新token
request.updToken = () => {
    // console.log(axios.defaults.timeout);
    let token = ConstJsonManager.get("login", "token");
    request.token = token;
    axios.defaults.headers['Authorization'] = token;
};




request.post = (url, params) =>{
    return new Promise((resolve, reject)=>{
        axios.post(url, params).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data);
            handleErr(err);
        })
    });
};



request.get = (url, params, oss_json) => {
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
*/




export default request ;



