/**
 * Created by Administrator on 2020/1/6.
 */

import request  from "../../utils/request";
import {mutations_const, actions_const} from "../StoreConstant";


const state = {
    currentMenus:[
    ]
};

const mutations = {
    [mutations_const.GET_NAV_MENUS] (state, type)
    {
        switch(type){
            case 1:  //管理员
                state.currentMenus = [
                  /*  {
                    title: "目录模板",
                    name: "DirectoryManagement",
                    path: "/index/directory-management",
                },{
                    title: "章节管理",
                    name: "ChapterManagement",
                    path: "/index/Chapter-management",
                },{
                    title: "知识点管理",
                    name: "KnowledgePointManagement",
                    path: '/index/knowledge-point-management'

                },*/
                    {
                    title: "学科学情",
                    name: "TeachingAssistantManagement",
                    path: "/index/teaching-assistant-management"
                }
                ];
                break;
        }
    }

};

const actions = {

};

export default {
    state,
    mutations,
    actions
}