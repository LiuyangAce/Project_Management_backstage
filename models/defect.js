// 导入mongoose
const mongoose = require('mongoose')

// 缺陷管理模型对象
const defectSchema = new mongoose.Schema({
  defectName: String,
  creatorID: String,
  handlerID: String,
  creator: String,
  owner: String,
  createTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  defectType: {
    type: String,
    default: 'low'
  },
  state: {
    type: String,
    default: 'active'
  }
})
const Defect = mongoose.model('defects',defectSchema)
module.exports = {
  Defect
}