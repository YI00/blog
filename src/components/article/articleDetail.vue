<template>
   <div class="content">
    <div class="article_wrap" >
      <div class="article_title">{{article.title}}</div>
      <div class="article_info">
        <span >发表于：{{article.date}}</span>
        <span >标签：
        <span v-if="article.labels.length===0">未分类</span>
        <el-tag v-else class="tag_margin" type="primary" v-for="tag in article.labels" :key="article.labels.id">{{ tag }}</el-tag>
        </span>
      </div>
        <mavon-editor
          class="md"
          :value="article.content"
          :subfield = "prop.subfield"
          :defaultOpen = "prop.defaultOpen"
          :toolbarsFlag = "prop.toolbarsFlag"
          :editable="prop.editable"
          :scrollStyle="prop.scrollStyle"
          :boxShadow="false"
        ></mavon-editor>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      id:this.$route.params.id,
      article:{}
    }
  },
  created(){
    this.getArticle()
  },
  methods:{
    getArticle(){
      this.$axios.get('/api/articleDetail/'+this.id).then(res=>{
        this.article = res.data
      })
    }
  },
  computed:{
    prop () {
          let data = {
            subfield: false,// 单双栏模式
            defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
            editable: false,
            toolbarsFlag: false,
            scrollStyle: true
          }
          return data
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
  .md{
    background: #fff!important;
  }
}
</style>
