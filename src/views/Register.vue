<template>
<div>
  <div>

    <el-form :rules="rules" ref="registerForm" :model="registerUser" class="login-form">
      <h3 class="login-title">用户注册</h3>

      <el-form-item prop="name">    <!--prop绑定表单校验规则-->
        <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="username">
        <el-input type="text" v-model="registerUser.username" placeholder="请输入登录名"></el-input>
      </el-form-item>


      <el-form-item prop="password">
        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="passwordCheck">
        <el-input type="password" v-model="registerUser.passwordCheck" placeholder="请再次输入密码"></el-input>
      </el-form-item>

      <el-form-item size="mini">
        <el-radio label="男" v-model="registerUser.gender" >男</el-radio>
        <el-radio label="女" v-model="registerUser.gender" >女</el-radio>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input type="text" v-model="registerUser.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="role">
        <el-select v-model="registerUser.role" placeholder="请选择用户类型">
          <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="doRegister" style="width:100%">注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return{
      registerUser:{
        name:'',
        username:'',
        password:'',
        passwordCheck:'',
        gender:'',
        phone:'',
        email:'',
        role:'',
        userface:''
      },
      roleOptions: [{
        value: 'ROLE_student',
        label: '学生'
      }, {
        value: 'ROLE_teacher',
        label: '教师'
      }],
      rules: {
        name:[
          {required: true, message:"请输入用户名", trigger: "blur"}
        ],
        username:[
          {required: true, message:"请输入登录名", trigger: "blur"}
        ],
        password:[
          {required: true, message:"请输入密码",trigger:"blur"}
        ],
        passwordCheck:[
          {required: true, message:"请再次输入密码",trigger:"blur"}
        ],
        phone:[
          {required: true, message:"请输入手机号",trigger:"blur"}
        ],
        email:[
          {required: true, message:"请输入邮箱地址",trigger:"blur"}
        ],
        role:[
          {required: true, message:"请选择用户类型",trigger:"blur"}
        ],

      },
    }
  },
  methods: {
    doRegister(){

      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if(this.registerUser.password===this.registerUser.passwordCheck){
            
            this.$postRequest("/register",this.registerUser).then(response=>{
              if(response){
                this.$message.success(response.message)
                this.$router.replace('/');
              }
            })
          }else {
            this.$message.error("两次输入的密码不正确")
            return false;
          }
          
        } else {
          this.$message.error("请输入登录信息")
          return false;
        }
      })


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
</style>