let apiUrl;

let isProd = true;

if (isProd) {

    apiUrl = 'https://sygbackstage2.hongchentech.com/';//生产环境
} else {

    apiUrl = 'https://test.sygbackstage2.hongchentech.com/';//测试环境
}

let isShow = false;
if (isShow) {
    apiUrl = 'https://show.hongchentech.com/';//演示环境
}


export { apiUrl, isProd}

export default isProd
