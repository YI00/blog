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
  }
})

const articleSchema = new mongoose.Schema({
  title:String,
  date:String,
  content:String,
  gist:String,
  labels:Array
})

const Models = {
  User:mongoose.model('User',userSchema),
  Article:mongoose.model('Article',articleSchema)
}

module.exports = Models