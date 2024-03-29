const mongoose = require('mongoose')
var config = require('../config');


// 连接数据库
module.exports = () => {
  mongoose.connect(config.mongodb_url,{useUnifiedTopology:true ,useNewUrlParser:true})
  .then(() => {
    console.log('数据库连接成功');
  }).catch ((err) => {
    console.error('数据库连接失败',err);
  })
}