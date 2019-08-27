<template>
  <div class="comment-container">
    <h3>发表评论</h3>
    <hr>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="msg">
    </el-input>
    <el-button type="primary" size="large" @click="postMessage">发表评论</el-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time}}
        </div>
        <div class="cmt-body">
          {{item.content ==='undefined' ?'该用户很懒，什么都没说':item.content}}
        </div>
      </div>
    </div>

    <el-button type="danger" size="large" plain @click="getMore">加载更多</el-button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      pageIndex:1,//默认第一页
      comments:[],
      msg:""
    }
  },
  created(){
    this.getComment()
  },
  methods:{
    async getComment(){
      const res = await this.$axios.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex)
      if(res.data.status == 0){
        // this.comments = res.data.message
        //每当获取新评论数据的时候，不要把老数据清空，而是应该以老数据拼接上新数据
        this.comments = this.comments.concat(res.data.message)
      }
    },
    getMore(){
      this.pageIndex++
      this.getComment()
    },
    async postMessage(){
      // 校验是否为空
      if(this.msg.trim().length==0){
        Toast("评论内容不能为空")
      }
      const res = await this.$axios.post("api/postcomment/"+this.$route.params.id,{
        content:this.msg.trim(),
        emulateJSON:true
      })
      if(res.data.status==0){
        let cmt ={
          user_name:'匿名用户',
          add_time:Date.now(),
          content:this.msg.trim()
        }
        this.comments.unshift(cmt)
        this.msg=""
      }
    }
  },
  props:["id"]
}
</script>
<style lang="scss" scoped>
.comment-container{
  h3{
    font-size: 18px;
  }
  textarea{
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list{
    margin: 5px 0;
    .cmt-item{
      font-size: 13px;
      .cmt-title{
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body{
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>