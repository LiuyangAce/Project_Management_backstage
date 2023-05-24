const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
router.prefix('/upload')

var storage = multer.diskStorage({
//设置文件的存储位置
destination: function(req, file, cb) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let dir = "./public/uploads/" + year + month + day

    // 判断文件是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir,{
        recursive: true
      })
    }
    cb(null,dir)
  },
  filename: function(req, file, cb) {
    //设置上传文件的名称
    let fileName = file.fieldname + "-" + Date.now() +path.extname(file.originalname)
    // 设置上传文件的名称
    cb(null, fileName)
  }
})

let upload = multer({storage})

// 上传文件的接口
router.post('/img', upload.single('myfile'), async ctx => {
  let path = ctx.req.file.path
  let replaceStr = "\\\\"
  path = ctx.origin + '' + path.replace('public','').replace(new RegExp(replaceStr,'g'),'/')
  ctx.body = {
    data: path
  }
})

module.exports = router