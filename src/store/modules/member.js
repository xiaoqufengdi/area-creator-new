/**
 * Created by Administrator on 2020/1/6.
 */

import request  from "../../utils/request";
import {mutations_const, actions_const} from "../StoreConstant";


const state = {
/*    navMenus: [
        "TeachersManagement", "StudentManagement"
        ,"ReaderMonitoring" , "ResultsQuery"
        , "CentralizedReader", "ExamManagement", "SetReviewTask"
    ],*/
    currentMenus:[
    ]
};

const mutations = {
    [mutations_const.GET_NAV_MENUS] (state, type)
    {
        switch(type){
            case 1:  //管理员
                state.currentMenus = [{
                    title: "教师管理",
                    name: "TeachersManagement",
                    path: "/index/teachers-management",
                },{
                    title: "学生管理",
                    name: "StudentManagement",
                    path: "/index/student-management",
                },{
                    title: "批阅监控",
                    name: "ReaderMonitoring",
                    path: '/index/reader-monitoring'

                },{
                    title: "成绩查询",
                    name: "ResultsQuery",
                    path: "/index/results-query"
                }
                ];
                break;
            case 2:  // 年级组长
                state.currentMenus = [{
                    title: "考试管理",
                    name: "ExamManagement",
                    path: "/index/exam-management",
                },{
                    title: "设置批阅任务",
                    name: "SetReviewTask",
                    path: "/index/set-review-task",
                },{
                    title: "批阅监控",
                    name: "ReaderMonitoring",
                    path: '/index/reader-monitoring'
                },{
                    title: "成绩查询",
                    name: "ResultsQuery",
                    path: "/index/results-query",
                }
                ];

                break;
            case 3:  //教师

                state.currentMenus = [{
                    title: "集中批阅",
                    name: "CentralizedReader",
                    path: "centralized-reader",
                },{
                    title: "成绩查询",
                    path: "results-query",
                    name: "ResultsQuery"
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