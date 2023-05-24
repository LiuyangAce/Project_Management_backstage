const mongoose = require('mongoose')

// 连接数据库
module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/madpecker',{useUnifiedTopology:true ,useNewUrlParser:true})
  .then(() => {
    console.log('数据库连接成功');
  }).catch ((err) => {
    console.error('数据库连接失败',err);
  })
}