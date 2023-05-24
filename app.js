const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const MongoConnect = require('./db')
const koajwt = require('koa-jwt') // 引入koa-jwt

//连接数据库
MongoConnect()

// 引入路由模块
const users = require('./routes/users')
const defect = require('./routes/defect')
const upload = require('./routes/upload')
const interface = require('./routes/interface')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// secret: 密钥
// unless 哪些地方不进行jwt认证
app.use(koajwt({
  secret: 'jianshu-server-jwt'
}).unless({
  path: [/^\/users\/login/,/^\/users\/reg/]
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(defect.routes(), defect.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(interface.routes(), interface.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
