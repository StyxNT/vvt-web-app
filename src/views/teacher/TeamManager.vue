<template>
  <div>

    <div>
      <el-table
          :data="teams"
          border
          style="width: 100%;">
        <el-table-column
            fixed
            prop="id"
            label="小队ID"
            width="70">
        </el-table-column>
        <el-table-column
            fixed
            prop="activity.id"
            label="活动ID"
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
            width="150">
          <template slot-scope="scope">
            <el-button @click="deleteChosenRow(scope.row)" type="text" size="small">删除小队</el-button>
            <el-button @click="editTeam(scope.row)" type="text" size="small">管理队员</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div>
      <el-dialog
          title="小队管理"
          :visible.sync="dialogVisible"
          width="60%">
        <div>

          <el-table
              :data="teamMembers"
              border
              style="width: 100%;">
            <el-table-column
                fixed
                prop="memberId"
                label="成员ID"
                width="70">
            </el-table-column>
            <el-table-column
                prop="user.name"
                label="姓名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="user.gender"
                label="性别"
                width="50">
            </el-table-column>
            <el-table-column
                prop="user.phone"
                label="电话号码"
                width="110">
            </el-table-column>
            <el-table-column
                prop="user.email"
                label="邮箱地址"
                width="160">
            </el-table-column>
            <el-table-column
                prop="score"
                label="评分"
                width="50">
            </el-table-column>

            <el-table-column
                prop="comment"
                label="评价"
                width="250">
            </el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
                width="150">
              <template slot-scope="scope">
                <el-button @click="updateComment(scope.row)" type="text" size="small">队员评价</el-button>
                <el-button @click="removeMember(scope.row)" type="text" size="small">移除成员</el-button>
              </template>
            </el-table-column>

          </el-table>


          <el-dialog
              title="成员评价"
              :visible.sync="commentDlg"
              width="30%">
            <div style="width:80%">
              <el-input type="text" v-model="comment.score" placeholder="请输入评分"/>
              <el-input type="textarea" v-model="comment.comment" placeholder="请输入评价"/>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelComment">取 消</el-button>
                <el-button type="primary" @click="doUpdateComment">确 定</el-button>
           </span>
          </el-dialog>


        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: "TeamManager",
  data() {
    return {
      teams: [],
      teamMembers: [],
      dialogVisible: false,
      commentDlg: false,
      comment: {
        id: '',
        score: '',
        comment: ''
      },
      chosenTeam:''
    }
  },
  mounted() {
    this.initTeams();
  },
  methods: {
    initTeams() {
      this.$getRequest('/teacher/team/').then(response => {
        if (response) {
          this.teams = response
        }
      })
    },
    initTeamMembers(teamId) {
      this.chosenTeam=teamId;
      this.$getRequest('/teacher/team/members/' + teamId).then(response => {
        if (response) {
          this.teamMembers = response;
        }
      })
    },
    deleteChosenRow(data) {
      this.$confirm('此操作将永久删除[' + data.id + ']小队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$deleteRequest('/teacher/team/' + data.id).then(response => {
          if (response) {
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
    editTeam(data) {
      this.initTeamMembers(data.id);
      this.dialogVisible = true;
    },
    removeMember(data) {
      this.$confirm('此操作将永久删除[' + data.user.name + ']成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$deleteRequest('/teacher/team/member/' + data.id).then(response => {
          if (response) {
            this.initTeamMembers(this.chosenTeam);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateComment(data) {
      this.comment.score = data.score;
      this.comment.comment = data.comment;
      this.comment.id = data.id;
      this.commentDlg = true;
    },
    cancelComment(){
      this.comment={
        id: '',
        score: '',
        comment: ''
      };
      this.commentDlg=false;
    },
    doUpdateComment(){
      this.$putRequest('/teacher/team/member/comment',this.comment).then(response =>{
        if(response){
          this.comment={
            id: '',
            score: '',
            comment: ''
          };
          this.initTeamMembers(this.chosenTeam);
          this.commentDlg=false;
        }
      })
    }
  }

}
</script>

<style scoped>

</style>