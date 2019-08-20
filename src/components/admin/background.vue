<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
           <el-menu-item-group>
            <el-menu-item index="/admin/background/users">用户列表</el-menu-item>
          </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>分类管理</template>
        <el-menu-item-group>
            <el-menu-item index="users">所有分类</el-menu-item>
            <el-menu-item index="users">修改分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>文章管理</template>
        <el-menu-item-group>
            <el-menu-item index="users">文章列表</el-menu-item>
            <el-menu-item index="users">新增文章</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="loginOut">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{ username }}</span>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<style >
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return{
        username:''
      }
    },
    created(){
      this.getUser()
    },
    methods:{
      // 获得用户信息
      async getUser(){
        this.username = sessionStorage.getItem("username")
      },
      // 注销用户
      loginOut(){
        console.log('ok')
        sessionStorage.clear()
      }
    }
  };
</script>