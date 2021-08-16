<template>
<div>
  <div>
    <div name="结果列表">
      <el-table :data="teams" border>

        <el-table-column
            fixed
            prop="id"
            label="队伍Id"
            width="70">
        </el-table-column>
        <el-table-column
            prop="activity.name"
            label="活动名称"
            width="200">
        </el-table-column>
        <el-table-column
            prop="activity.activityDescription"
            label="活动描述"
            width="500">
        </el-table-column>
        <el-table-column
            prop="activity.startDate"
            label="开始日期"
            width="120">
        </el-table-column>
        <el-table-column
            prop="activity.endDate"
            label="结束时间"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="小队创建时间"
            width="110">
        </el-table-column>
        <el-table-column
            prop="active"
            label="小队是否启用"
            width="79">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.active" type="success">已启用</el-tag>
            <el-tag v-else type="danger">未启用</el-tag>
          </template>
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="160">
          <template slot-scope="scope">
            <el-button @click="teamInfo(scope.row)" type="text" size="small">详细信息</el-button>
            <el-button @click="leaveTeam(scope.row)" type="text" size="small">退出小队</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div name="详细信息对话框">
      <el-dialog
          title="详细信息"
          :visible.sync="dialogVisible"
          width="30%">
        <div >

          <tr>
            <td>
              <el-tag>老师名字:</el-tag>
            </td>
            <td>
              <p>{{teamTeacher.name}}</p>
            </td>
          </tr>

          <tr>
            <td>
              <el-tag>老师手机:</el-tag>
            </td>
            <td>
              <p>{{teamTeacher.phone}}</p>
            </td>
          </tr>

          <tr>
            <td>
              <el-tag>老师邮箱:</el-tag>
            </td>
            <td>
              <p>{{teamTeacher.email}}</p>
            </td>
          </tr>

          <tr>
            <td>
              <el-tag>活动成绩:</el-tag>
            </td>
            <td>
              <p>{{comment.score}}</p>
            </td>
          </tr>

          <tr>
            <td>
              <el-tag>活动评价:</el-tag>
            </td>
            <td>
              <p>{{comment.comment}}</p>
            </td>
          </tr>



        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="teamInfo">确 定</el-button>
       </span>
      </el-dialog>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "MyTeam",
  data() {
    return{
      teams:[],
      teamTeacher:{},
      comment:{},
      dialogVisible:false
    }
  },
  mounted() {
    this.initTeams();
  },
  methods: {
    initTeams(){
      this.$getRequest('/student/myteam').then(response=>{
        if(response){
          this.teams=response;
        }
      })
    },
    leaveTeam(data){
      this.$confirm('是否确定退出[' + data.id + ']小队?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$deleteRequest('/student/team/'+data.id).then(response=>{
          if(response){
            this.initTeams();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    teamInfo(data){
        this.$getRequest('/student/team/teacher/'+data.id).then(response=>{
          if(response){
            this.teamTeacher=response;
          }
        });

      this.$getRequest('/student/team/'+data.id+'/comment').then(response=>{
        if(response){
          this.comment=response;
        }
      });
      this.dialogVisible=true;
    }
  }
}
</script>

<style scoped>
.el-tag{
  margin-right: 10px;
}
</style>