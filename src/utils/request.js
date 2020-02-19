/**
 * Created by Administrator on 2020/1/3.
 */
import {ConstJsonManager } from "../utils/ConstJsonManager";
import URL from "./UrlConfig";
import {apiUrl} from '../utils/BaseUrlConfig'
import axios from "axios";

axios.defaults.baseURL = apiUrl;
// axios.defaults.timeout = 30000;


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
    },

    //switchContent: params=>post("/htmlToContent/test", JSON.stringify(params)) ,
    //getPageNumber: params=>post("/htmlToContent/list", JSON.stringify(params)),
   // getHTMLByPageNumber: params=>post("/htmlToContent/query", JSON.stringify(params)),
};

request.upload = (params)=>{
    return new Promise((resolve, reject)=>{
        axios.post("/api/docToHtml/test/", params, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data);
        })
    });
    //axios.post("./docToHtml/test/", {file: formData}, { headers: { 'Content-Type': 'multipart/form-data' } })
};

request.switchContent = (params)=>{
    return new Promise((resolve, reject)=>{
        axios.post("/api/htmlToContent/test", params, { headers: { 'Content-Type': 'application/json' } }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data);
        })
    });
//axios.post("./docToHtml/test/", {file: formData}, { headers: { 'Content-Type': 'multipart/form-data' } })
};

request.getHTMLByPageNumber = (params)=>{
    return new Promise((resolve, reject)=>{
        axios.post("/api/htmlToContent/query", JSON.stringify(params), { headers: { 'Content-Type': 'application/json'} }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data);
        })
    });
};


//getPageNumber: params=>post("/htmlToContent/list", JSON.stringify(params)),

 request.getPageNumber = (params)=>{
        return new Promise((resolve, reject)=>{
            axios.post("/api/htmlToContent/list", JSON.stringify(params), { headers: { 'Content-Type': 'application/json'} }).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err.data);
            })
        });
 };


request.getTeachingAssistantData = (params)=>{
    return new Promise((resolve, reject)=>{
        axios.post("/api/teachingAssistantInfo/list", { headers: { 'Content-Type': 'application/json'} }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data);
        })
    });
};

/*
//更新token
request.updToken = () => {
    // console.log(axios.defaults.timeout);
    let token = ConstJsonManager.get("login", "token");
    request.token = token;
    axios.defaults.headers['Authorization'] = token;
};
*/

request.getPeriod = ()=>{
    return new Promise((resolve, reject)=>{
        axios.post("/api/questionDictionary/period", { headers: { 'Content-Type': 'application/json'} }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data);
        })
    });
};



export default request ;



