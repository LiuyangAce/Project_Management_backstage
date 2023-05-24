let { Defect } = require("../models/defect")
let defectUtil = require("./defectUtiil/index")

// //查询一条缺陷
// const defectFindOne = async (ctx,next) => {
//   await defectUtil.findOne(Defect,{_id},ctx)
// }

// 查询所有缺陷（分页）
const defectFindAll = async (ctx,next) => {
  await defectUtil.findAll(Defect,{...ctx.request.body},ctx)
}

// 查询所有缺陷根据条件（分页）
const defectFindAllByCondition = async (ctx,next) => {
  await defectUtil.findAllByCondition(Defect,{...ctx.request.body},ctx)
}

// 添加一个缺陷
const defectAdd = async (ctx, next) => {
  await defectUtil.add(Defect, {...ctx.request.body}, ctx)
}

// 更新缺陷
const defectUpdateDefect = async (ctx, next) => {
  await defectUtil.update(Defect, {_id:ctx.request.body._id}, {...ctx.request.body}, ctx)
}

const defectFindInfo = async (ctx, next) => {
  await defectUtil.findInfo(Defect,null, ctx)
}

const defectTypes = async (ctx, next) => {
  await defectUtil.findTypes(Defect, ctx)
}
module.exports = {
  defectAdd,
  defectFindAll,
  defectFindAllByCondition,
  defectUpdateDefect,
  defectFindInfo,

  defectTypes
}