import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";
import AddActivity from "@/views/teacher/activity/AddActivity";
import ManageActivity from "@/views/teacher/activity/ManageActivity";
import Register from "@/views/Register";

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
        name:'活动管理',
        path:'/home',
        component: Home,
        role:'ROLE_teacher',
        children:[
            {
                path:'/addActivity',
                name:'选项一',
                component: AddActivity
            },
            {
                path:'/manageActivity',
                name:'选项二',
                component: ManageActivity
            }
        ]
    },
    {
        name:'小队管理',
        path:'/home',
        component: Home,

    }
]

const router=new VueRouter(
    {
        // mode:"history",
        routes
    }
);

export default router;