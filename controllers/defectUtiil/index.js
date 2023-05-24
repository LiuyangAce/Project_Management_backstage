//查询所有缺陷（分页）
const findAll = async (model, where, ctx) => {
  let { page, pageSize } = where.pagination

  //判断页码
  if (!page || isNaN(Number(page))) {
    page = 1
  } else {
    page = Number(page)
  }

  //每页条数
  // let pageSize = 10
  //计算总页数
  let count = 0
  await model
    .find()
    .count()
    .then((rel) => {
      count = rel
    })
  let totalPage = 0
  if (count > 0) {
    // 向上取整
    totalPage = Math.ceil(count / pageSize)
  }

  // 判断当前页码的范围
  // 传入page大于最大页数 就把最大页数给page
  // 传入page小于1 就把1给page
  if (totalPage > 0 && page > totalPage) {
    page = totalPage
  } else if (page < 1) {
    page = 1
  }

  // 计算起始位置
  let start = (page - 1) * pageSize

  await model
    .find()
    .skip(start)
    .limit(pageSize)
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: "缺陷查询成功",
          result: rel,
          page,
          pageSize,
          count,
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "没有查询到缺陷",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "缺陷查询时候出现异常",
        err,
      }
    })
}

// 查询所有缺陷根据条件（分页）
const findAllByCondition = async (model, where, ctx) => {
  let { page, pageSize } = where.pagination

  //判断页码
  if (!page || isNaN(Number(page))) {
    page = 1
  } else {
    page = Number(page)
  }

  //每页条数
  // let pageSize = 10
  //计算总页数
  let count = 0
  await model
    .find(where.condition)
    .count()
    .then((rel) => {
      count = rel
    })
  let totalPage = 0
  if (count > 0) {
    // 向上取整
    totalPage = Math.ceil(count / pageSize)
  }

  // 判断当前页码的范围
  // 传入page大于最大页数 就把最大页数给page
  // 传入page小于1 就把1给page
  if (totalPage > 0 && page > totalPage) {
    page = totalPage
  } else if (page < 1) {
    page = 1
  }

  // 计算起始位置
  let start = (page - 1) / pageSize

  await model
    .find(where.condition)
    .skip(start)
    .limit(pageSize)
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: "缺陷查询成功",
          result: rel,
          page,
          pageSize,
          count,
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "没有查询到缺陷",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "缺陷查询时候出现异常",
        err,
      }
    })
}

// 新增缺陷
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

// 修改缺陷
const update = async (model, where, params, ctx) => {
  let oldState = null
  await model
    .findOne(where)
    .then((result) => {
      oldState = result.state
    })
    .catch((err) => {
      console.log(err)
    })
  if (oldState === "active" && params.state === "finish") {
    params.endTime = new Date()
  } else if (oldState === "finish" && params.state === "active") {
    params.endTime = ""
  }
  await model
    .updateOne(where, params)
    .then((result) => {
      ctx.response.body = {
        code: 200,
        msg: "缺陷修改成功",
      }
    })
    .catch((err) => {
      ctx.response.body = {
        code: 400,
        msg: "缺陷修改出现异常",
        err,
      }
    })
}

const findInfo = async (model, where, ctx) => {
  let total = null
  // 总缺陷
  await model
    .find()
    .count()
    .then((res) => {
      total = res
    })
  let activeDefect = null
  await model
    .find({ state: "active" })
    .count()
    .then((res) => {
      activeDefect = res
    })
  let finishDefect = null
  await model
    .find({ state: "finish" })
    .count()
    .then((res) => {
      finishDefect = res
    })
  let hasOwnerDefect = null

  await model
    .find({ owner: { $exists: true } })
    .count()
    .then((res) => {
      hasOwnerDefect = res
    })
  ctx.response.body = {
    code: 200,
    msg: "查询成功",
    data: {
      total, // 总缺陷
      activeDefect, // 未完成
      finishDefect, // 已完成
      hasOwnerDefect, //已分配
      noOwnerDefect: total - hasOwnerDefect, //未分配
    },
  }
}

const findTypes = async (model, ctx) => {
  let low = null
  let mid = null
  let high = null
  await model
    .find({ defectType: "low" })
    .count()
    .then((res) => {
      low = res
    })
  await model
    .find({ defectType: "mid" })
    .count()
    .then((res) => {
      mid = res
    })
  await model
    .find({ defectType: "high" })
    .count()
    .then((res) => {
      high = res
    })
    
    ctx.response.body = {
      code: 200,
      msg: '查询成功',
      data: {
        low,
        mid,
        high
      }
    }
}
module.exports = {
  add,
  findAll,
  findAllByCondition,
  update,
  findInfo,

  findTypes
}
