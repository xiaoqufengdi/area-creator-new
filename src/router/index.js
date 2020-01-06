import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld';
import Login from "@/components/Login";
import BaseContent from "@/components/BaseContent";

import ReaderMonitoring from "@/components/ReaderMonitoring/ReaderMonitoring";
import ResultsQuery from "@/components/ResultsQuery/ResultsQuery";
import StudentManagement from "@/components/StudentManagement/StudentManagement";
import TeachersManagement from "@/components/TeachersManagement/TeachersManagement";


Vue.use(Router);

export default new Router({
  routes: [
      {
        path:'/',
        name: "login",
        component: Login
      },
      {
          path:"/login",
          name: "login",
          component: Login
      },
      {
          path: "/base-content",
          component: BaseContent,
          children:[
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
                  path: "student-management",
                  name: "StudentManagement",
                  component: StudentManagement
              },
              {
                  path: "teachers-management",
                  name: "TeachersManagement",
                  component: TeachersManagement
              }
          ]
      },
      {
          path:"*", redirect: "/login"
      }
  ]
})
