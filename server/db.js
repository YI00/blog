const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog',{
  useNewUrlParser:true
})

const userSchema = new mongoose.Schema({
  name:{type:String},
  password:
  {
    type:String,
    set(val){
      return require('bcrypt').hashSync(val,10)
    }
  },
  visitor:{type:Number}
})

const articleSchema = new mongoose.Schema({
  title:String,
  date:String,
  content:String,
  gist:String,
  labels:Array,
  html:String,
  md:String
})

const commentSchema=new mongoose.Schema({
  comments:[{
    comId:Number,
    username:{
      type:Number,
      default:'匿名',
    },
    comDate:{
      type:Date,
      default:new Date()
    },
    content:String
  }],
  artId:Number,
})

const Models = {
  User:mongoose.model('User',userSchema),
  Article:mongoose.model('Article',articleSchema),
  Comment:mongoose.model('Comment',commentSchema)
}

module.exports = Models