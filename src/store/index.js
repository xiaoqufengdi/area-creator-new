import Vue from "vue";
import Vuex from "vuex";
import logger from "vuex/dist/logger";  //logger是一个日志插件
import {mutations, actions} from  "./mutations";
Vue.use(Vuex);
//容器是唯一的
const state = {count: 0};
/*
const mutations = {
  add(state, count) { //state是自动放入的， 默认当前的状态state
    if (isNaN(parseInt(count)))
      return;
    state.count += count;
  },
  minus(state){
    state.count-=1;
  }
};
*/
//Vuex 允许我们在 store 中定义"getter"
//getter的返回值会根据依赖缓存下来，当依赖值发生了变化才会重新计算
const getters = {
  val:(state)=>state.count % 2 ? "old" : "even"
};
let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [logger()],
  strict: true //地方只能通过mutation(管理员)来更改状态，但他不支持异步
});

export default store;
