import axiosUtil from '../configs/axiosConfig'
// 商家列表
export const getMerchantList = (params) => axiosUtil({
  url: 'merchant/list',
  method: 'get',
  params: params
})
// 商家类别列表
export const getMerchantTypeList = () => axiosUtil({
  url: 'merchant/type',
  method: 'get'
})
// 获取推荐菜品
export const getRecommendList = (params) => axiosUtil({
  url: '/menu/menuRecommendList',
  method: 'get',
  params: params
})
// 获取菜品列表
export const getMenuList = (params) => axiosUtil({
  url: '/menu/menuList',
  method: 'get',
  params: params
})
// 加入购物车
export const addToCart = (params) => axiosUtil({
  url: '/shoppingCart/saveGoods',
  method: 'post',
  params: params
})
// 查看购物车
export const showCart = () => axiosUtil({
  url: '/shoppingCart/show',
  method: 'get'
})
// 更新购物车商品
export const uodateShoppingCartGoodsNum = (params) => axiosUtil({
  url: '/shoppingCart/update',
  method: 'put',
  params: params
})
// 结算购物车 下单
export const makeOrder = () => axiosUtil({
  url: 'order/make',
  method: 'post'
})
// 查看订单
export const showOrder = () => axiosUtil({
  url: 'order/show',
  method: 'get'
})
// 删除订单
export const deleteOrders = (params) => axiosUtil({
  url: 'order/delete',
  method: 'delete',
  params: params
})
// 查询订单总数
export const queryTotalOrders = () => axiosUtil({
  url: 'order/total',
  method: 'get'
})
// 更新订单状态
export const updateOrderStatus = (params) => axiosUtil({
  url: 'order/update',
  method: 'put',
  params: params
})
// 用户登录
export const login = (params) => axiosUtil({
  url: '/user/userLogin',
  method: 'post',
  params: params
})
// 用户注册
export const register = (params) => axiosUtil({
  url: 'user/register',
  method: 'post',
  params: params
})
// 更改密码
export const updatePwd = (params) => axiosUtil({
  url: '/user/resetPwd',
  method: 'put',
  params: params
})
// 查询用户收货地址
export const getDelivery = () => axiosUtil({
  url: 'user/delivery',
  method: 'get'
})
// 添加收货地址
export const addDelivery = (params) => axiosUtil({
  url: 'user/saveDelivery',
  method: 'post',
  params: params
})
// 删除收货地址
export const deleteDelivery = (params) => axiosUtil({
  url: 'user/deleteDelivery',
  method: 'delete',
  params: params
})
// 设置默认收货地址
export const setMainDelivery = (params) => axiosUtil({
  url: 'user/updateMainDelivery',
  method: 'put',
  params: params
})
// 查询用户最近三条订单
export const getRecentlyOrders = () => axiosUtil({
  url: 'user/getRecentlyOrders',
  method: 'get'
})
