let { User } = require("../models/users")
let usersUtil = require("./usersUtil/index")
const jwt = require('jsonwebtoken')

// 用户登录
const userLogin = async (ctx, next) => {
  await usersUtil.login (User,
    {
      username: ctx.request.body.username,
      pwd: ctx.request.body.pwd
    },ctx)
}

// 用户注册
const userReg = async (ctx, next) => {
  const exist = await usersUtil.findUsers(User,{username: ctx.request.body.username},ctx)
  if (!exist) await usersUtil.createUsers(User,ctx.request.body,ctx)
}

// 获取token
const userVerity = async (ctx, next) => {
  const token = ctx.header.authorization.replace('Bearer ','')
  let result = jwt.verify(token,'jianshu-server-jwt')
  await usersUtil.verify(User, {_id:result._id}, ctx)
}

// 修改 密码
const userPwdUpdate = async (ctx, next) => {
  await usersUtil.updatePwd(User, {...ctx.request.body}, ctx)
}

//添加用户
const userAdd = async (ctx, next) => {
  let { username = "", pwd = "",type="" } = ctx.request.body
  await usersUtil.add(User, { username, pwd, type }, ctx)
}
//修改个人资料
const userUpdatePersonal = async (ctx, next) => {
  let {_id,avatar='',sex='',desc='',phone='',email=''} = ctx.request.body
  console.log(_id,avatar,sex,desc,phone,email);
  await usersUtil.update(
    User,
    { _id},
    { 
      avatar,
      sex,
      desc,
      phone,
      email
    },
    ctx
  )
}
//删除用户
const userDel = async (ctx, next) => {
  let {_id} = ctx.request.body
  await usersUtil.del(User, {_id}, ctx)
}
//查询所有用户
const userFind = async (ctx, next) => {
  await usersUtil.find(User, null, ctx)
}

// //查询所有用户
// const userFind = async (ctx, next) => {
//   await usersUtil.find(User, null, ctx)
// }

//查询单个用户
const userFindOne = async (ctx, next) => {
  await usersUtil.findOne(User, {_id:ctx.request.body._id}, ctx)
}

//查看人员组成
const userComponent = async (ctx, next) => {
  await usersUtil.findComponent(User,ctx)
}
module.exports = {
  userAdd,
  userUpdatePersonal,
  userDel,
  userFind,
  userFindOne,

  userLogin,
  userReg,
  userVerity,
  userPwdUpdate,

  userComponent
}
