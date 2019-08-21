const express = require('express')
const router = express.Router()
const db = require('./db')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')

const SECRET = 'sghsjdfgshjf'



//注册
router.post('/api/register',async (req,res)=>{
  // 1.看数据库是否已存在
  const name = req.body.name

  const isDuplicate = await db.User.findOne({name})
  if(isDuplicate){
    return res.json({
      code:0,
      message:'该用户名已被注册'
    })
  }

  const user = await db.User.create({
    name:req.body.name,
    password:req.body.password
  })
  res.json({
    code:1,
    message:'注册成功'
  })
})

// 登录
router.post('/api/login',async (req,res)=>{
  // const { name,password } = req.body
  // // 1.根据用户名找用户

  // const user = await db.User.findOne({name}).select('+password')
  // assert(user,422,'用户不存在')

  // // 2.校验密码
  // const isValid = require('bcrypt').compareSync(password,user.password)
  // assert(isValid,422,'密码错误')

  // // 3.返回token
  // const token = jwt.sign({id:user.id},SECRET)
  // res.json({ token })

  const user = await db.User.findOne({
    name:req.body.name
  })
  if(!user){
    return res.json({
      code:0,
      message:'用户不存在'
    })
  }
  const isPasswordValid = require('bcrypt').compareSync(
    req.body.password,
    user.password
  )
  if(!isPasswordValid){
    return res.json({
      code:0,
      message:'密码错误'
    })
  }
  // 生成token
  const token = jwt.sign({
    _id:String(user._id)
  },SECRET)
  res.json({
    code:1,
    user,
    token
  })
})

// 权限验证中间件
// const auth = async (req,res,next)=>{
//   const raw = String(req.headers.authorization).split(' ')
//   const { id } = jwt.verify(raw,SECRET)
//   req.user = await db.User.findById(id)
//   next()
// }
// // 判断登录的是哪位用户
// router.get('/api/admin/user',auth,async (req,res)=>{
//   res.json(req.user)
// })


// 获取所有文章
router.get('/api/articleList',async (req,res)=>{
  const articles = await db.Article.find()
  res.json(articles)
})

// 文章详情页
router.get('/api/articleDetail/:id',async (req,res)=>{
 const articel = await db.Article.findOne({_id:req.params.id})
 res.json(articel)
})

// 文章保存
router.post('/api/admin/saveArticle',function(req,res){
  new db.Article(req.body).save(function(err){
    if(err){
      return res.status(500).send()
    }
    res.json({
      code:1,
      message:'文章保存成功'
    })
  })
})

// 文章更新
router.post('/api/admin/updateArticle',function(req,res){
  var info = req.body
  db.Article.find({_id:info._id},function(err,data){
    if(err){
      return 
    }
    data[0].title = info.title
    docs[0].date = info.date
    docs[0].content = info.content
    docs[0].gist = info.gist
    docs[0].labels = info.labels
    db.Article(data[0]).save(function(err){
      if(err){
        return res.status(500).send()
      }
      res.send()
    })
  })
})


router.post('/api/admin/deleteArticle',function(req,res){
  db.Article.remove({_id:req.body._id},function(err){
    if(err){
      return res.status(500).send()
    }
    res.json({
      code:1,
      message:'删除成功'
    })
  })
})

// 查看所有用户
router.get('/api/users',async(req,res)=>{
  const users = await db.User.find()
  res.json(users)
})

module.exports = router 