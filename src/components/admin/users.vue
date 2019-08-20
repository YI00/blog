<template>
  <div>
     <el-table :data="users">
        <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
           <template slot-scope="scope">
             <el-button type="primary" size="small" plain @click="edit">修改</el-button>
             <el-button type="primary" size="small" plain>删除</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return {
      users:[]
    }
  },
  created(){
    this.getUsers()
  },
  methods:{
    async getUsers(){
      const res = await this.$axios.get('/api/users')
      this.users = res.data
    },
    edit(){
      this.$router.push('useredit')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>