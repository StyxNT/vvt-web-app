import axios from 'axios';
import {Message} from "element-ui";
import router from "@/router"

//请求拦截器
axios.interceptors.request.use(config=>{
    //在请求头中添加token
    var token = window.localStorage.getItem("token");
    if(token){
        config.headers['Authorization']=token;
    }
    return config;
},error => {
    console.log(error);
})

//统一处理判断axios响应正确与否
//响应拦截器
//此处的success指的是请求响应成功，但不保证业务逻辑是否成功，所以需要进行处理
axios.interceptors.response.use(success=>{
    //成功调取接口，即响应正常，但是业务逻辑出错，后端返回错误码

    //success为接口返回的数据，status为返回的http状态码，200说明接口响应正常
    if(success.status&&success.status===200)
    {
        //data为后端返回的数据，code是我们自己定义的数据，表示后端返回的状态码
        //需要注意的是，这里的状态码是模仿http状态码来自定义的状态码，而status返回的则是http的状态码
        //500 401 403为自定义的几个错误码
        if(success.data.code===500||success.data.code===401||success.data.code===403){
            //success.data.message自己定义的后端返回数据
            Message.error({message:success.data.message});
            return;
        }
        //如果正确，这判断有无返回信息，有则输出
        if(success.data.message){
            Message.success({message:success.data.message})
        }
        //返回收到的数据
        return success.data;
    }
},error =>{
    //调取接口失败，响应错误
    if(error.response.code===504||error.response.code===404){
        Message.error({message:"服务器错误"});
    }else if(error.response.code===403){
        Message.error({message:"权限不足"});
    }else if(error.response.code===401){
        Message.error({message:"尚未登录，请登录"});
        router.replace("/")
    }else{
        if(error.response.data.message){
            Message.error({message:error.response.data.message});
        }else {
            Message.error({message:"未知错误"});
        }
    }
    return;
});


//封装post请求函数
let baseURL='';//前置路径
export const postRequest=(url,params)=>{
    return axios({
        method: "POST",
        url:baseURL+url,
        data:params
    })
}
export const getRequest=(url,params)=>{
    return axios({
        method: "GET",
        url:baseURL+url,
        data:params
    })
}
export const putRequest=(url,params)=>{
    return axios({
        method: "PUT",
        url:baseURL+url,
        data:params
    })
}
export const deleteRequest=(url,params)=>{
    return axios({
        method: "DELETE",
        url:baseURL+url,
        data:params
    })
}