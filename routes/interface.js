const router = require('koa-router')()
const interfaceCtl = require('../controllers/interface')

router.prefix('/interface')

// 查询所有缺陷（分页）
router.post('/findAll',interfaceCtl.interfaceFindAll)

//根据条件查询所有缺陷 （分页）
router.post('/findAllByCondition',interfaceCtl.interfaceFindAllByCondition)

//修改interface
router.post('/update', interfaceCtl.interfaceUpdate)

//添加/创建interface
router.post('/add', interfaceCtl.interfaceAdd)

//删除interface
router.post('/del', interfaceCtl.interfaceDel)

//interface 模块类别
router.get('/module', interfaceCtl.interfaceFindModule)

module.exports = router
