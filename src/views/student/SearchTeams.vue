<template>
  <div>
    <div name="搜索栏">
      <el-input style="width:300px;margin-right: 10px"
                v-model="searchKey"
                @keyup.enter.native="doSearch"
                type="text"
                placeholder="请输入搜索关键词..."/>
      <el-button type="primary" @click="doSearch">搜索</el-button>
    </div>
    <div name="搜索结果列表">
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
            width="100">
          <template slot-scope="scope">
            <el-button @click="chooseTeam(scope.row)" type="text" size="small">加入小队</el-button>
          </template>
        </el-table-column>


      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchTeams",
  data() {
    return {
      searchKey: '',
      teams: []
    }
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    doSearch() {
      this.$getRequest('/student/team/?keyword=' + this.searchKey).then(response => {
        if (response) {
          this.teams = response;
          console.log(this.teams)
        }
      })
    },
    chooseTeam(data) {
      this.$postRequest('/student/team', {teamId: data.id});
    }
  }

}
</script>

<style scoped>

</style>