<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="login-form">
      <h3 class="login-title">登录</h3>
      <el-form-item prop="username">    <!--prop绑定表单校验规则-->
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
<!--      <el-form-item prop="code">-->
<!--        <el-input type="text" v-model="loginForm.code" placeholder="点击图片刷新验证码" class="login-code" ></el-input>-->
<!--        <img :src="captchaURL" @click="updateCaptcha" style="vertical-align:middle" />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitLogin" style="width:48%;margin-left: 2px">登录</el-button>
        <el-button type="info" @click="toRegister"  style="width:48%">注册</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>

export default {
  name: "Login",
 data(){
    return {
      loginForm: {
        username:"",
        password:"",
        code:"",
      },
      captchaURL:"/captcha?time="+new Date(),//这里增加一个时间作为参数，是为了保证每次刷新都能返回一个新的图片
      rules: {
        username:[
          {required: true, message:"请输入用户名", trigger: "blur"}
        ],
        password:[
          {required: true, message:"请输入密码",trigger:"blur"}
        ],
        // code:[
        //   {required: true, message:"请输入验证码",trigger:"blur"}
        // ]

      },
    }
  },
  mounted() {
    if(window.localStorage.getItem('token')!==null){
      let path=this.$route.query.redirect;
      this.$router.replace(path==='/'||path===undefined?'/home':path);
    }
  },
  methods: {
    submitLogin() {
        //点击登录按钮时校验表单并提示
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$postRequest("/login",this.loginForm).then(response=>{
              if(response){
                //保存用户token
                const token=response.obj.tokenHead+response.obj.token;
                window.localStorage.setItem("token", token);
                //页面跳转
                //获取重定向路径
                let path=this.$route.query.redirect;
                this.$router.replace(path==='/'||path===undefined?'/home':path);
              }
            })
          } else {
            this.$message.error("请输入登录信息")
            return false;
          }
        })
    },
    updateCaptcha(){
      this.captchaURL="/captcha?time="+new Date();
    },
    toRegister(){
      this.$router.push('/register');
    }

  }
}

</script>

<style scoped>
  .login-form {
    border-radius: 15px;
    background-clip: padding-box;
    margin:180px auto;
    width:350px;
    padding: 15px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-title{
    margin: 8px auto 30px;
    text-align: center;
  }
  .login-code{
    width: 70%;
    margin-right: 5px;
    vertical-align:middle
  }

</style>