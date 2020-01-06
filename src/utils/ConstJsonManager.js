/******************************管理缓存数据localStorage **************************************/


// "token":  {autoLogin: true, name: "yuwls", password: "123456", rememberPass: false, token: ""}
let ConstJsonManager = {
    get(key1, key2)
    {
        let value = localStorage.getItem(key1);
        value = JSON.parse(value);
        return key2 ? value[key2] : value;
    },
    set(key, val){
        let value = localStorage.getItem(key);
        if(value)
        {
            //支持部分键值对更新
            value = JSON.parse(value);
            if(value instanceof Object && !(value instanceof Array) && val)
            {
                val = Object.assign(value, val);
            }
        }

        localStorage.setItem(key, JSON.stringify(val));
    }
};


export {ConstJsonManager};
