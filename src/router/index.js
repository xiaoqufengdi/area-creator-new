import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld';
import Login from "@/components/Login";
import BaseContent from "@/components/index";

import ReaderMonitoring from "@/components/ReaderMonitoring/ReaderMonitoring";
import ResultsQuery from "@/components/ResultsQuery/ResultsQuery";
import StudentManagement from "@/components/StudentManagement/StudentManagement";
import TeachersManagement from "@/components/TeachersManagement/TeachersManagement";
import CentralizedReader from "@/components/CentralizedReader/CentralizedReader";
import ExamManagement from "@/components/ExamManagement/ExamManagement";
import SetReviewTask from "@/components/SetReviewTask/SetReviewTask";


Vue.use(Router);

const router = new Router({
    routes: [
        {
            path:'/',
            redirect: "/login"
        },
        {
            path:"/login",
            name: "login",
            component: Login,
            alwaysShow: true,
            meta: {
                requireAuth:  false
            }
        },
        {
            path: "/index",
            component: BaseContent,
            children:[

                {
                    path: "teachers-management",
                    name: "TeachersManagement",
                    component: TeachersManagement
                },
                {
                    path: "student-management",
                    name: "StudentManagement",
                    component: StudentManagement
                },
                {
                    path: 'reader-monitoring',
                    name: 'ReaderMonitoring',
                    component: ReaderMonitoring
                },
                {
                    path: "results-query",
                    name: "ResultsQuery",
                    component: ResultsQuery
                },
                {
                    path: "centralized-reader",
                    name: "CentralizedReader",
                    component: CentralizedReader
                },
                {
                    path: "exam-management",
                    name: "ExamManagement",
                    component: ExamManagement
                },
                {
                    path: "set-review-task",
                    name: "SetReviewTask",
                    component: SetReviewTask
                }
            ]
        },
        {
            path:"*", redirect: "/login"
        }
    ]
});

//全局前置守卫
router.beforeEach((to, from, next)=>{

    next();
});


export default  router;