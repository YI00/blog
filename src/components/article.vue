<template>
  <div class="content">
    <div class="article_wrap" v-for="item in articleList" :key="item.id">
      <div class="article_title" @click="getArticleDetail(item._id)">{{item.title}}</div>
      <div class="article_info">
        <span >发表于：{{item.date}}</span>
        <span >标签：
        <span v-if="item.labels.length===0">未分类</span>
        <el-tag v-else class="tag_margin" type="primary" v-for="tag in item.labels" :key="item.labels.id">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{item.gist}}</div>
      <div class="article_button" @click="getArticleDetail(item._id)">阅读全文></div>
      <div class="article_underline"></div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
    return {
      articleList:[]
    }
  },
  created(){
    this.getArticleList()
  },
  methods:{
    async getArticleList(){
      const res = await this.$axios.get('/api/articleList')
      this.articleList = res.data.reverse()
    },
    getArticleDetail(id){
       // 这边不能多一个斜杠 '/articleDetail/'  因为router定义的路由是 '/articleDetail:id'
        // 我把router改成 '/articleDetail/:id' 让前后端的路由规则一致
      this.$router.push('/articleDetail/'+id)
    }
  }
}
</script>
<style lang="scss" scoped>
.article_wrap{
  background-color: #fff;
  padding: 40px 0 ;
  .article_title{
    display: inline-block;//为了让boder只有标题文字那么长
    color:#222;
    font-size: 34px;
    font-weight: 600;
    border-bottom: 2px solid white;//如果不再这设置一个border，在hover时才设置，则会出现抖动
    cursor: pointer;
  }
  .article_title:hover{
    border-bottom: 2px solid #222;
  }
  .article_info{
    color: #999;
    font-size: 14px;
    margin: 20px 0;
  }
  .tag_margin{
    margin:3px;
  }
  .article_gist{
    margin: -10px 0 10px 0;
  }
  .article_button{
    display: inline-block;
    border: 1px solid #222;
    padding: 5px;
  }
  .article_button:hover{
    background-color: #222;
    color:white;
    font-weight: 600;
    cursor: pointer;
  }
  .article_underline{
    margin-top: 10px;
    height: 10px;
    background-color: #f5f7f9;
  }
}
</style>

