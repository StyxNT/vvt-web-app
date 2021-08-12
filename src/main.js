import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Vuex from "vuex";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

import router from "@/router";
import store from "@/store";

import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

Vue.prototype.$postRequest=postRequest;
Vue.prototype.$putRequest=putRequest;
Vue.prototype.$getRequest=getRequest;
Vue.prototype.$deleteRequest=deleteRequest;

router.beforeEach(async (to, from, next) => {
  if(window.localStorage.getItem('token')){
     if(window.sessionStorage.getItem('user')===null){
       await getRequest('/user/info').then(response=>{
         if(response){
          window.sessionStorage.setItem('user',JSON.stringify(response));
         }
       })
     }
    next();
  }else {
    //对未登录用户进行处理，如果未登录用户请求的地址是登录地址就直接放行
    if(to.path==='/'||to.path==='/register'){
      next();
    }else{
      // 如果未登录用户访问的地址不是登录地址，就要进行重定向
      next('/?redirect='+to.path);
    }
  }
  next();
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
