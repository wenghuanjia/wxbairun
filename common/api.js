const libs = require('./request')

// 获取 首页轮播图 数据
export const reqBannerData = _ => libs.get('/home/lunbo/list')

// 获取 首页 财税知多点 模块数据
export const reqTaxSpot = _ => libs.get('/home/index/newtypelist')

// 获取 新闻列表数据
export const reqNewsList = ({
  id,
  page
}) => libs.get(`/home/index/newlist/id/${id}/page/${page}`)

// 获取 新闻 详情数据
export const reqNewDetail = id => libs.get(`/home/index/newdetails/id/${id}`)

// 微信授权登录
export const login = data => libs.post('/wxapp/public/login', data)

// 个人节税 计算
export const reqTaxSaving = data => libs.get('/home/yunsuan/index', data)

// 企业节税 计算
export const reqETaxSaving = data => libs.get('/home/qiyeyunsuan/index', data)

// 添加 或 修改 发票抬头
export const addOrEditInvoice = data => libs.post('/user/taitou/add', data)

// 获取 发票 抬头
export const reqInvoice = _ => libs.get('/user/taitou/list')

// 删除 发票抬头
export const delInvoice = data => libs.post('/user/taitou/del', data)

// 获取 我的地址
export const reqMyAddress = _ => libs.get('/user/dizhi/list')

// 添加 或 修改 我的地址
export const addOrEditMyAddress = data => libs.post('/user/dizhi/add', data)

// 删除 我的地址
export const delMyAddress = data => libs.post('/user/dizhi/del', data)

// 添加产品信息 type = 1 添加税务代理合同 type 2 添加 商事代理 type = 3 添加新业态用工
export const addProductInfo = data => libs.post('/user/hetong/add', data)

// 图片上传
export const uploadImg = data => libs.post('/user/upload/one', data)

// 获取默认 信息
export const reqDefaultInfo = _ => libs.get('/user/taitou/info')

// 获取 合同列表
export const reqContractList = _ => libs.get('/user/hetong/list')

// 获取 联系电话
export const reqPhone = _ => libs.get('/home/index/tell')
