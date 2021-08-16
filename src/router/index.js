import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";
import AddActivity from "@/views/teacher/AddActivity";
import ManageActivity from "@/views/teacher/ManageActivity";
import Register from "@/views/Register";
import TeamManager from "@/views/teacher/TeamManager";
import SearchTeams from "@/views/student/SearchTeams";
import MyTeam from "@/views/student/MyTeam";

Vue.use(VueRouter);



const routes = [
    {
        name:"Login",
        path:"/",
        component: Login,
        role:"logout"
    },
    {
        name:"Register",
        path:"/register",
        component: Register,
        role:"logout"
    },
    {
        name:'教师端功能',
        path:'/home',
        component: Home,
        role:'ROLE_teacher',
        children:[
            {
                path:'/addActivity',
                name:'添加活动',
                component: AddActivity
            },
            {
                path:'/manageActivity',
                name:'管理我的活动',
                component: ManageActivity
            },
            {
                path:'/teamManager',
                name:'管理我的小队',
                component: TeamManager
            }
        ]
    },
    {
        name:'学生端功能',
        path:'/home',
        component: Home,
        role:'ROLE_student',
        children:[
            {
                path:'/SearchTeam',
                name:'搜索活动小队',
                component: SearchTeams
            },
            {
                path:'/MyTeams',
                name:'我的活动小队',
                component: MyTeam
            }
        ]
    }

]

const router=new VueRouter(
    {
        // mode:"history",
        routes
    }
);

export default router;