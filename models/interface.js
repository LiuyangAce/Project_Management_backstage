// 导入mongoose
const mongoose = require("mongoose")

// 系统用户模型对象
const interfaceSchema = new mongoose.Schema({
  interfaceName: String,
  creatorID: String,
  creator: String,
  interfacePath: String, //接口路径
  interfaceType: String,
  requestMethod: {
    type: String,
    enum: ["GET", "POST", "DELETE", "PUT"],
  },
  interfaceState: {
    type: String,
    enum: ["已完成", "未完成"],
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: "",
  },
  postRequestParams: {
    type: String,
    default: "",
  },
  ResponseParams: {
    type: String,
    default: "",
  },
  getRequestParams: {
    type: String,
    default: "",
  },
})
const Interface = mongoose.model("interfaces", interfaceSchema)

module.exports = {
  Interface,
}
