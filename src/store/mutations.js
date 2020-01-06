import * as Types from "./StoreConstant";
const mutations = {
  [Types.INCREMENT](state, count) {
    //state是自动放入的， 默认当前的状态state
    if (isNaN(parseInt(count)))
      return;
    state.count += count;
  },
  [Types.DECREMENT](state){
    state.count-=1;
  },
  [Types.MULTIPLICATION](state, info)
  {
    state = state*state;
    console.log(info);
  }

};
//actions接受一个与store具有相同方法和属性的context对象
//action可以包含异步操作， Action 提交的是 mutation
const actions11 = {
  [Types.DECREMENT](context){
    setTimeout(()=>{
      context.commit([Types.DECREMENT])
    }, 1000)
  }
};
//简写
//store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise
const actions = {
  [Types.MULTIPLICATION]({commit}, result){
    console.log(result);
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        commit(Types.MULTIPLICATION, result);//commit时result作为参数传递
        resolve();
      }, 1000)
    })
  }
};

export {mutations, actions} ;

//宏
