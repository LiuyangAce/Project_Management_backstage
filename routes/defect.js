const router = require('koa-router')()
const defectCtl = require('../controllers/defect')

router.prefix('/defect')

// 查询所有缺陷（分页）
router.post('/findAll',defectCtl.defectFindAll)

// 根据条件查询所有缺陷 （分页）
router.post('/findAllByCondition',defectCtl.defectFindAllByCondition)

// 更新缺陷
router.post('/update',defectCtl.defectUpdateDefect)

// 新增缺陷
router.post('/add',defectCtl.defectAdd)

// panel 查询
router.get('/findInfo', defectCtl.defectFindInfo)

// panel 查询缺陷的各个优先级
router.get('/findDefectTypes', defectCtl.defectTypes)
module.exports = router


