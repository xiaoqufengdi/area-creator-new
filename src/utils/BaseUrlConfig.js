let apiUrl;

let isProd = false;

if (isProd) {

    apiUrl = 'https://sygbackstage2.hongchentech.com/';//生产环境
} else {

    apiUrl = " http://localhost:8081/"//'https://test.sygbackstage2.hongchentech.com/';//测试环境
}



export { apiUrl, isProd}

export default isProd
