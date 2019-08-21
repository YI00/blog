<template>
  <div>
     <el-table :data="articles">
        <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
           <template slot-scope="scope">
             <el-button type="primary" size="small" plain @click="editA(scope.row)">修改</el-button>
             <el-button type="primary" size="small" plain @click="deleteA(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return {
      articles:[]
    }
  },
  created(){
    this.getArticle()
  },
  methods:{
    async getArticle(){
      const res = await this.$axios.get('/api/articleList')
      this.articles = res.data
    },
    // edit(row){
    //   this.$router.push('/admin/addArticle'+row._id)
    // },
    // 修改文章
    async editA(row){
      const id = row._id
      this.$router.push(
        '/admin/addArticle/'+id
      )
    },
    // 删除文章
    async deleteA(row){
      const res = await this.$axios.post('/api/admin/deleteArticle',{_id:row._id})
      if(res.data.code==1){
        this.$message({
          type:'success',
          message:res.data.message
        })
        this.getArticle()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>