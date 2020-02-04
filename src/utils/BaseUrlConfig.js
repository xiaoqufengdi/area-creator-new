let apiUrl;

let isProd = false;

if (isProd) {

    apiUrl = 'https://sygbackstage2.hongchentech.com/';//生产环境
} else {

    apiUrl = "http://localhost:8080/" // 'http://192.168.1.29:8080/'//'https://test.sygbackstage2.hongchentech.com/';//测试环境
}



export { apiUrl, isProd}

export default isProd
