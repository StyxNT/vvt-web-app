<template>
  <div>
    <el-container>

      <el-header class="header">
        <div class="title">VVT志愿活动管理系统</div>

                <el-dropdown class="userInfo" @command="commandHandler">

                      <span class="el-dropdown-link">
                        {{ user.name }}
                        <img :src="user.userFace" loading="lazy">
                      </span>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>

                </el-dropdown>

      </el-header>

      <el-container>

        <el-aside width="200px">
          <el-menu router :default-openeds="openeds">

            <el-submenu
                :index="item.path"
                v-for="(item,index) in activeMenus"
                :key="index">

              <template slot="title">
                <span>{{ item.name }}</span>
              </template>

              <el-menu-item
                  :key="indexJ"
                  :index="children.path"
                  v-for="(children,indexJ) in item.children">
                {{ children.name }}
              </el-menu-item>


            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <!--面包屑效果-->
          <!--不在首页才有面包屑效果-->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!--          处在首页时显示欢迎信息-->
          <div class="welcomeHome" v-if="this.$router.currentRoute.path==='/home'">
            欢迎使用VVT志愿活动管理系统
          </div>

          <router-view class="home-router-view"/>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      openeds:['/home']
    }

  },
  computed: {
    activeMenus: function (){
      let item=this.routes;
      let userRole=JSON.parse(window.sessionStorage.getItem('user')).roles[0].role;
      // console.log(userRole);
      let result=[];
      for(let i=0;i<item.length;i++){
        if(item[i].role===userRole){
          result.push(item[i])
        }
      }
      // console.log(result);
      return result;
    },
    routes() {
      return this.$router.options.routes;
    }
  },
  methods: {
    commandHandler(command) {
      if (command === 'logout') {

        this.$confirm('确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //注销登录
          this.$postRequest('/logout');
          //清空登录信息
          window.localStorage.removeItem('token');
          window.sessionStorage.removeItem('user');
          //清空菜单
          this.$store.commit('initRoutes', []);
          //跳转到登录页面
          this.$router.replace('/');

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      }
    }
  }

}
</script>

<style scoped>

.header {
  background-color: #4094ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.title {
  font-size: 30px;
  font-family: 楷体, serif;
  color: white;
}

.userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-left: 8px;
}

.welcomeHome {
  text-align: center;
  font-size: 30px;
  font-family: 楷体;
  color: #409eff;
  padding-top: 100px;
}

.home-router-view {
  margin-top: 10px;
}
</style>