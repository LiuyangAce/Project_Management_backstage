let { User } = require("../models/users")
let usersUtil = require("./usersUtil/index")
const jwt = require('jsonwebtoken')

const test1 =  async (ctx, next) => {
  // await usersUtil.test1 (ctx)
  return ctx.response.body = [
    {
      x:1,
      y:2,
      s:'数据1'
    },
    {
      x:1,
      y:2,
      s:'数据2'
    }
  ]
}

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

const polyline =  async (ctx, next) => { 
  console.log(11111);
  return ctx.response.body = 
  [
    {
      "dataX": [
          "202105",
          "202106",
          "202107",
          "202108",
          "202109",
          "202110",
          "202111",
          "202112",
          "202201"
      ],
      "dataValue": [{
              "title": "上海",
              "value": [
                  392,
                  300,
                  387,
                  201,
                  271,
                  264,
                  351,
                  331,
                  314,
                  211
              ]
          },
          {
              "title": "北京",
              "value": [
                  152,
                  200,
                  187,
                  201,
                  251,
                  364,
                  151,
                  231,
                  214,
                  251
              ]
          }
      ]
    }
  ]
}

const polyline1 =  async (ctx, next) => { 
  ctx.response.body = 
  [
    {
      "dataX": [
          "202105",
          "202106",
          "202107",
          "202108",
          "202109",
          "202110",
          "202111",
          "202112",
          "202201"
      ],
      "dataValue": [{
              "title": "上海",
              "value": [
                  392,
                  300,
                  387,
                  201,
                  271,
                  264,
                  351,
                  331,
                  314,
                  211
              ]
          },
          {
              "title": "北京",
              "value": [
                  152,
                  200,
                  187,
                  201,
                  251,
                  364,
                  151,
                  231,
                  214,
                  251
              ]
          }
      ]
    }
  ]
}

const columnar = async (ctx, next) => {
  return ctx.response.body = 
  [
    {
      "dataX": [
          "202105",
          "202106",
          "202107",
          "202108",
          "202109",
          "202110",
          "202111",
          "202112",
          "202201",
          "202202"
      ],
      "dataValue": [{
              "title": "手机端",
              "value": [
                  45,
                  99,
                  71,
                  87,
                  129,
                  14,
                  33,
                  46,
                  26,
                  28
              ]
          },
          {
              "title": "PC端",
              "value": [
                  45,
                  22,
                  71,
                  87,
                  188,
                  14,
                  33,
                  66,
                  26,
                  28
              ]
          },
          {
              "title": "手机APP",
              "value": [
                  56,
                  12,
                  51,
                  87,
                  148,
                  14,
                  33,
                  66,
                  26,
                  28
              ]
          }
      ]
    }
  ]
}

const tabulation = async (ctx, next) => {
  return ctx.response.body = 
  [
    {
    "dataValue": [{
            "date": "2020-08-05",
            "amount": 1258,
            "series": "推广渠道1",
            "category": "社交媒体"
        },
        {
            "date": "2020-08-05",
            "amount": 4500,
            "series": "推广渠道2",
            "category": "搜索引擎"
        },
        {
            "date": "2020-08-05",
            "amount": 2300,
            "series": "推广渠道3",
            "category": "社交媒体"
        },
        {
            "date": "2020-08-05",
            "amount": 800,
            "series": "推广渠道4",
            "category": "搜索引擎"
        },
        {
            "date": "2020-08-05",
            "amount": 3500,
            "series": "推广渠道5",
            "category": "其他"
        },
        {
            "date": "2020-08-06",
            "amount": 1000,
            "series": "推广渠道1",
            "category": "社交媒体"
        },
        {
            "date": "2021-05-07",
            "amount": 1430,
            "series": "推广渠道2",
            "category": "搜索引擎"
        },
        {
            "date": "2021-07-17",
            "amount": 1790,
            "series": "推广渠道3",
            "category": "社交媒体"
        }
      ]
    }
  ]
}

module.exports = {
  tabulation,
  columnar,
  polyline,
  polyline1,
  test1,
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
