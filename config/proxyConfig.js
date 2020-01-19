/**
 * Created by Administrator on 2020/1/6.
 */

module.exports = {
    proxy: {
        '/api': {    //将www.exaple.com印射为/apis
            target: 'http://192.168.1.65:8080',  // 跨域地址
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/api': ''   //用/api 代替target里面的地址，  比如'/api/user/add' 相当于 http://192.168.1.65:8080/user/add
            }
        }
    }
}
