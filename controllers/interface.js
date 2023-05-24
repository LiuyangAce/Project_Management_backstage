let { Interface } = require("../models/interface")
let interfaceUtil = require("./interfaceUtil/index")

// 查询所有缺陷（分页）
const interfaceFindAll = async (ctx,next) => {
  await interfaceUtil.findAll(Interface,{...ctx.request.body},ctx)
}

const interfaceFindAllByCondition = async (ctx,next) => {
  await interfaceUtil.findAllByCondition(Interface,{...ctx.request.body},ctx)
}

// 添加一个缺陷
const interfaceAdd = async (ctx, next) => {
  await interfaceUtil.add(Interface, {...ctx.request.body}, ctx)
}

const interfaceUpdate = async (ctx, next) => {
  await interfaceUtil.update(Interface, {_id:ctx.request.body._id}, {...ctx.request.body}, ctx)
}

const interfaceDel = async (ctx, next) => {
  await interfaceUtil.del(Interface, {_id:ctx.request.body._id}, ctx)
}

const interfaceFindModule = async (ctx, next) => {
  await interfaceUtil.findModule(Interface,ctx)
}
module.exports = {
  interfaceFindAll,
  interfaceAdd,
  interfaceFindAllByCondition,
  interfaceUpdate,
  interfaceDel,

  interfaceFindModule
}