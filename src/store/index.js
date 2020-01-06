import Vue from "vue";
import Vuex from "vuex";
import modules from './modules'

//import logger from "vuex/dist/logger";  //logger是一个日志插件
Vue.use(Vuex);
//容器是唯一的

let store = new Vuex.Store({
  modules,
  // plugins: [logger()],
  strict: true //地方只能通过mutation(管理员)来更改状态，但他不支持异步
});

export default store;
