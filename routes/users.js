const router = require('koa-router')()
const userCtl = require('../controllers/users')

router.prefix('/users')

//添加用户 已验证
router.post('/add', userCtl.userAdd)

//删除
router.post('/del', userCtl.userDel)

//查询 已验证
router.get('/find', userCtl.userFind)

// 查询开发人员用户
// router.post('/findRD', userCtl.userFindRD)

//修改个人资料 已验证
router.post('/update/personal', userCtl.userUpdatePersonal)

//查询单个用户
router.post('/findOne', userCtl.userFindOne)

//登录 已验证
router.post('/login', userCtl.userLogin)

//注册 已验证
router.post('/reg', userCtl.userReg)

//验证 未验证
router.post('/verify', userCtl.userVerity)

//修改密码 已验证
router.post('/updatePwd', userCtl.userPwdUpdate)

//查询人员组成
router.get('/component', userCtl.userComponent)

module.exports = router
