<template>
  <div style="width:40%">
    <el-form :rules="rules" ref="activityForm" :model="activity" class="activity-form">
      <h3 class="login-title">添加活动</h3>

      <el-form-item prop="name">    <!--prop绑定表单校验规则-->
        <el-input type="text" v-model="activity.name" placeholder="请输入活动名"></el-input>
      </el-form-item>

      <el-form-item prop="activityDescription">
        <el-input type="textarea"
                  :autosize="{ minRows: 6, maxRows: 100}"
                  v-model="activity.activityDescription"
                  placeholder="请输入活动描述"></el-input>
      </el-form-item>


      <el-form-item prop="maxParticipant">
        <el-tag style="margin-right: 8px">最大可参与人数:</el-tag>
        <el-input-number v-model="activity.maxParticipant" :min="1" label="最大人数"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-date-picker
            value-format="yyyy-MM-dd"
            style="margin-right: 8px"
            v-model="activity.startDate"
            type="date"
            placeholder="选择活动开始日期">
        </el-date-picker>
        <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="activity.endDate"
            type="date"
            placeholder="选择活动结束日期">
        </el-date-picker>
      </el-form-item>


      <el-form-item style="margin-left:100px">
        <el-button type="primary" @click="addActivity" >提交</el-button>
        <el-button type="warning" @click="clearActivity" >清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddActivity",
  data() {
    return {
      activity: {
        name: '',
        activityDescription: '',
        maxParticipant: '',
        startDate: '',
        endDate: ''
      },
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
  methods: {
    addActivity() {
      this.$refs.activityForm.validate((valid) => {
        if (valid) {
          if (this.activity.startDate !== '' && this.activity.endDate !== '') {

            this.$postRequest("/teacher/activity", this.activity).then(response => {
              if (response) {
                this.clearActivity();
              }
            })
          } else {
            this.$message.error("请输入活动的开始时间和结束时间")
            return false;
          }

        } else {
          this.$message.error("请完善活动信息")
          return false;
        }
      })
    },
    clearActivity() {
      this.activity={
        name: '',
        activityDescription: '',
        maxParticipant: '',
        startDate: '',
        endDate: ''
      }
    }

  }
}
</script>

<style scoped>

</style>