<template>
  <div class="head">
      <div class="left">
        <img src="../assets/logo1.jpg" alt="">
      </div>
      <div class="right">欢迎来到Ysz的博客</div>
  </div>
</template>
<style lang="scss" scoped>
.head{
  width: 100%;
  height: 70px;
  line-height: 70px;
  background-color: #fff;
  margin-bottom: 15px;
  box-shadow: 0 5px 5px rgba(0,0,0,0.07);
  position: relative;
  .left{
    float: left;
    margin: 5px 20px;
    position: absolute;
    left: 600px;
    img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    }
  }
  .right{
    float: left;
    font-weight:bold;
    font-size: 20px;
    position: absolute;
    left: 700px;
  }
}
</style>

