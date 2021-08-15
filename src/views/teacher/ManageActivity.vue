<template>
  <div>
    <el-table
        :data="activities"
        border
        style="width: 100%;">
      <el-table-column
          fixed
          prop="id"
          label="活动ID"
          width="70">
      </el-table-column>
      <el-table-column
          prop="name"
          label="活动名称"
          width="200">
      </el-table-column>
      <el-table-column
          prop="activityDescription"
          label="活动描述"
          width="500">
      </el-table-column>
      <el-table-column
          prop="startDate"
          label="开始日期"
          width="120">
      </el-table-column>
      <el-table-column
          prop="endDate"
          label="结束时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="maxParticipant"
          label="最大活动人数"
          width="120">
      </el-table-column>
      <el-table-column
          prop="enabled"
          label="是否启用"
          width="79">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
          <el-tag v-else type="danger">未启用</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="90">
        <template slot-scope="scope">
          <el-button @click="showEditDlg(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteChosenRow(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="createTeam(scope.row)" type="text" size="small">创建小队</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div>
      <el-dialog
          title="修改活动信息"
          :visible.sync="dialogVisible"
          width="60%">
        <div>
          <el-form :rules="rules" ref="editActivityForm" :model="editActivity" class="activity-form">
            <el-form-item prop="name">    <!--prop绑定表单校验规则-->
              <el-input type="text" v-model="editActivity.name" placeholder="请输入活动名"></el-input>
            </el-form-item>

            <el-form-item prop="activityDescription">
              <el-input type="textarea"
                        :autosize="{ minRows: 6, maxRows: 100}"
                        v-model="editActivity.activityDescription"
                        placeholder="请输入活动描述"></el-input>
            </el-form-item>


            <el-form-item prop="maxParticipant">
              <el-tag style="margin-right: 8px">最大可参与人数:</el-tag>
              <el-input-number v-model="editActivity.maxParticipant" :min="1" label="最大人数"></el-input-number>
            </el-form-item>

            <el-form-item>
              <el-date-picker
                  value-format="yyyy-MM-dd"
                  style="margin-right: 8px"
                  v-model="editActivity.startDate"
                  type="date"
                  placeholder="选择活动开始日期">
              </el-date-picker>
              <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="editActivity.endDate"
                  type="date"
                  placeholder="选择活动结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateActivity">确 定</el-button>
            </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: "ManageActivity",
  data() {
    return {
      activities: [],
      editActivity: {
        name: '',
        activityDescription: '',
        maxParticipant: '',
        startDate: '',
        endDate: ''
      },
      dialogVisible: false,
      rules: {
        name: [
          {required: true, message: "请输入活动名称", trigger: "blur"}
        ],
        activityDescription: [
          {required: true, message: "请输入活动描述", trigger: "blur"}
        ],
        maxParticipant: [
          {required: true, message: "请输入活动的最大人数", trigger: "blur"}
        ]
      }
    }
  },
  mounted() {
    this.initActivities();
  },
  methods: {
    initActivities() {
      this.$getRequest('/teacher/activity').then(response => {
        if (response) {
          this.activities = response;
        }
      })
    },
    showEditDlg(row) {
      Object.assign(this.editActivity, row);
      this.dialogVisible = true;

    },
    deleteChosenRow(data) {
      this.$confirm('此操作将永久删除[' + data.name + ']活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$deleteRequest('/teacher/activity/' + data.id).then(response => {
          if (response) {
            this.initActivities();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    doUpdateActivity() {
      this.$putRequest('/teacher/activity', this.editActivity).then(response => {
        if (response) {
          this.initActivities();
          this.editActivity = {
            name: '',
            activityDescription: '',
            maxParticipant: '',
            startDate: '',
            endDate: ''
          };
          this.dialogVisible = false;
        }
      })
    },
    createTeam(data){
      let team = {activityId:data.id}
      this.$postRequest('/teacher/team',team).then(response =>{
        if (response){
          return
        }
      })
    }

  }
}
</script>

<style scoped>

</style>