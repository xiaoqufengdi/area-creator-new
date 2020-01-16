import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld';
import Login from "@/components/Login";
import BaseContent from "@/components/index";

import ChapterManagement from "@/components/ChapterManagement/ChapterManagement";
import DirectoryManagement from "@/components/DirectoryManagement/DirectoryManagement";
import KnowledgePointManagement from "@/components/KnowledgePointManagement/KnowledgePointManagement";
import TeachingAssistantManagement from "@/components/TeachingAssistantManagement/TeachingAssistantManagement";
import TitleDisplay from "@/components/TeachingAssistantManagement/TitleDisplay";


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
                    path: "directory-management",
                    name: "DirectoryManagement",
                    component: DirectoryManagement
                },
                {
                    path: "Chapter-management",
                    name: "ChapterManagement",
                    component: ChapterManagement
                },
                {
                    path: 'knowledge-point-management',
                    name: 'KnowledgePointManagement',
                    component: KnowledgePointManagement
                },
                {
                    path: "teaching-assistant-management",
                    name: "TeachingAssistantManagement",
                    component: TeachingAssistantManagement,
                },
                {
                    path: "title-display",
                    name: "TitleDisplay",
                    component: TitleDisplay
                }
            ]
        },
   /*     {
            path:"*", redirect: "/login"
        }*/
    ]
});

//全局前置守卫
router.beforeEach((to, from, next)=>{

    next();
});


export default  router;