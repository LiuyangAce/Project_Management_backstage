const jwt = require("jsonwebtoken")

// 用户登录
const login = (model, where, ctx) => {
  return model
    .findOne(where)
    .then((result) => {
      if (result) {
        // 通过_id和username生产token
        let token = jwt.sign(
          {
            username: result.username,
            _id: result._id,
          },
          "jianshu-server-jwt",
          {
            expiresIn: 3600 * 24 * 7,
          }
        )
        ctx.response.body = {
          code: 200,
          msg: "登录成功",
          token,
          result,
        }
      } else {
        ctx.response.body = {
          code: 300,
          msg: "登录失败,用户名或密码错误",
        }
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 500,
        msg: "登录时出现异常",
        err,
      }
    })
}

// 用户注册
const findUsers = (model, where, ctx) => {
  return model.findOne(where).then((result) => {
    return result
      ? (ctx.response.body = {
          code: 300,
          msg: "用户名已存在",
        })
      : false
  })
}
// 创建用户
const createUsers = (model, where, ctx) => {
  return model
    .create(where)
    .then((result) => {
      if (result) {
        ctx.response.body = {
          code: 200,
          msg: "添加成功",
        }
      } else {
        ctx.response.body = {
          code: 300,
          msg: "添加失败",
        }
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "添加出现异常",
      }
      console.error(err)
    })
}

// 验证用户
const verify = (model, where, ctx) => {
  return model
    .findOne(where)
    .then((result) => {
      if (result) {
        ctx.response.body = {
          code: 200,
          msg: "用户认证成功",
          result,
        }
      } else {
        ctx.response.body = {
          code: 500,
          msg: "用户认证失败",
        }
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 500,
        msg: "用户认证失败",
        err,
      }
    })
}

// 修改密码
const updatePwd = (model, where, ctx) => {
  return model
    .updateOne({ username: where.username }, { pwd: where.pwd })
    .then((result) => {
      if (result.modifiedCount > 0) {
        ctx.response.body = {
          code: 200,
          msg: "密码修改成功",
        }
      } else {
        ctx.response.body = {
          code: 300,
          msg: "密码修改失败",
        }
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 500,
        msg: "修改密码时出现异常",
        err,
      }
    })
}
//=================

/**
 * 用于添加数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @return {*}
 */
const add = (model, where, ctx) => {
  return model
    .create(where)
    .then((result) => {
      if (result) {
        ctx.response.body = {
          code: 200,
          msg: "添加成功",
          data: result,
        }
      } else {
        ctx.response.body = {
          code: 300,
          msg: "添加失败",
        }
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "添加出现异常",
      }
      console.error(err)
    })
}

/**
 * 用于更新/修改某条数据的公共方法
 * @param {*} model
 * @param {*} ctx
 * @return {*}
 */
const update = (model, where, params, ctx) => {
  return model
    .updateOne(where, params)
    .then((result) => {
      if (result.modifiedCount > 0) {
        ctx.response.body = {
          code: 200,
          msg: "个人资料修改成功",
        }
      } else {
        ctx.response.body = {
          code: 300,
          msg: "个人资料修改失败",
        }
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "个人资料修改出现异常",
        err,
      }
    })
}

/**
 * 用户删除的公共方法
 * @param {*} model
 * @param {*} ctx
 * @return {*}
 */
const del = (model, where, ctx) => {
  return model
    .findOneAndDelete(where)
    .then((result) => {
      ctx.response.body = {
        result,
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "修改出现异常",
      }
      console.error(err)
    })
}

/**
 * 用于查询所有数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @return {*}
 */
const find = (model, where, ctx) => {
  return model
    .find(where)
    .then((result) => {
      ctx.response.body = {
        code: 200,
        msg: "查询成功",
        data: result,
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "查询出现异常",
      }
      console.error(err)
    })
}

/**
 * 用户查询单个数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @return {*}
 */
// 查询
const findOne = (model, where, ctx) => {
  return model
    .findOne(where)
    .then((result) => {
      ctx.response.body = {
        code: 200,
        msg: "查询成功",
        data: result,
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "查询单个出现异常",
      }
      console.error(err)
    })
}

const findComponent = async (model, ctx) => {
  let frontendDeveloper = null
  let backendDeveloper = null
  let tester = null
  await model
    .find({ type: "测试人员" })
    .count()
    .then((res) => {
      tester = res
    })
  await model
    .find({ type: "前端开发人员" })
    .count()
    .then((res) => {
      frontendDeveloper = res
    })
  await model
    .find({ type: "后端开发人员" })
    .count()
    .then((res) => {
      backendDeveloper = res
    })
  
  ctx.response.body = {
    code: 200,
    msg: '查询成功',
    data: {
      frontendDeveloper,
      backendDeveloper,
      tester
    }
  }
}

module.exports = {
  find,
  add,
  update,
  del,
  findOne,

  login,
  findUsers,
  createUsers,
  verify,
  updatePwd,

  findComponent,
}
