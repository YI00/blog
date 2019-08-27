<template>
  <div id="sign_wrap">
    <h1>后台管理</h1>
    <div v-if="status">
      <el-input v-model="model.name" placeholder="请输入用户名"></el-input>
      <el-input v-model="model.password" placeholder="请输入密码" type="password"></el-input>
      <el-button type="primary" @click="login">登录</el-button>
      <p class="toSignUp">还未注册，去注册 <span @click="changeStatus">Sign Up!</span></p>
    </div>
    <div v-else>
      <el-input v-model="model.name" placeholder="请输入用户名"></el-input>
      <el-input v-model="model.password" placeholder="请输入密码" type="password"></el-input>
      <el-button type="primary" @click="register">注册</el-button>
      <p class="toSignUp"><span @click="changeStatus" > Back to Sign In !</span></p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      status:true,//true登录，false注册
      model:{}
    }
  },
  methods:{
    async login(){
      const res = await this.$axios.post('/api/login',this.model)
      if(res.data.code == 0){
        this.$message({
        type:'error',
        message:res.data.message
        })
      }else{
        // localStorage.token = res.data.token
        if(res.data.user.visitor===1){
            sessionStorage.setItem("username",res.data.user.name)
            sessionStorage.setItem("usertoken",res.data.token)
            sessionStorage.setItem("visitor",1)
           this.$router.push('/')
           this.$message({
              type:'success',
              message:'登录成功'
          })
        }else{
          sessionStorage.setItem("username",res.data.user.name)
          sessionStorage.setItem("usertoken",res.data.token)
          this.$router.push('/admin/background')
          this.$message({
            type:'success',
            message:'登录成功'
          })
        }   
      }
    },
    changeStatus:function(){
      this.status=!this.status
    },
    async register(){
      const res = await this.$axios.post('/api/register',this.model)
      if(res.data.code ==0){
        this.$message({
          type:'error',
          message:res.data.message
        })
      }else{
        this.$message({
          type:'success',
          message:res.data.message
        })
      }
    }
    // back:function(){
    //   this.status=!this.status
    //   this.reset()
    // },
    // reset:function(){
    //   this.name="",
    //   this.password=""
    // },
    // signUp:function(){
    //   // 注册
    //   let _this=this
    //   // if(this.name.length<3){
    //   //   this.$message.error('用户名为空或小于三个字符')
    //   //   return
    //   // }
    //   // if (this.password.length < 1) {
    //   //     this.$message.error('密码不能为空或小于1个字符')
    //   //     return
    //   // }
    //   if(this.password!=this.password1){
    //     this.$message.error("密码不对")
    //   }
    //   this.$axios.post('/api/admin/signUp',{
    //     name:_this.name,
    //     password:_this.password
    //   })
    //   .then(res=>{
    //     _this.$message({
    //       type:'success',
    //       message:res.data.msg
    //     })
    //     if(res.data.status==1){
    //       _this.back()
    //     }
    //   })
    //   .catch(reject=>{
    //     console.log(reject)
    //   })
    //   },
    //   signIn:function(){
    //   let _this=this
    //   _this.$axios.post('/api/admin/signIn',{
    //     name:this.name,
    //     password:this.password
    //   })
    //   .then(res=>{
    //     if(res.data.status==1){
    //       let type=res.data.type
    //       if(type==1){
    //         this.$router.push({name:"background"})
    //       }else{
    //         this.$router.push({name:"article"})
    //       }
    //     }else{
    //       _this.$message({
    //         type:"error",
    //         message:res.data.msg
    //       })
    //     }
    //   })
    // }
  }
}

</script>
<style lang="scss" scoped>
#sign_wrap {
    width: 300px;
    margin: 200px auto;
  }

  #sign_wrap h1 {
    color: #383a42;
    padding: 10px;
  }

  #sign_wrap div {
    padding-bottom: 20px;
  }
</style>
