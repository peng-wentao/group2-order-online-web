<template>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#409EFF"
  text-color="#EBEEF5"
  active-text-color="#ffd04b">
  <el-menu-item index="1" class="menu" ><i class="iconfont icon-homepage_fill" ></i><span class="iconFont" @click="gotoIndex">首页</span></el-menu-item>
  <el-menu-item index="2" class="menu"><i class="incon iconfont icon-gouwuche"></i><span class="iconFont" @click="gotoShoppingCart">购物车</span></el-menu-item>
  <el-menu-item index="3" class="menu" ><i class="incon iconfont icon-wodedingdan"></i><span class="iconFont" @click="gotoOrder">我的订单</span></el-menu-item>
  <el-menu-item index="4" class="menu"><i class="incon iconfont icon-people_fill"></i><span class="iconFont" @click="gotoPersonal">个人中心</span></el-menu-item>
  <div v-if="phone !=null " class="phone">
     <span>{{phone}}</span>
     <span @click="out" style="font-size: 14px; margin-left:2vw;">注销</span>
  </div>
  <div v-else class="phone">
  <span v-if="!isLoginPage"  @click="gotoLogin" style="font-size: 14px; margin-left:2vw; font-color:#fffff">请登录</span>
  </div>
</el-menu>
</template>
<script>
import router from '../../router/index'
import cookies from 'vue-cookies'
import { Message } from 'element-ui'
export default {
  name: 'top',
  data () {
    return {
      refresh: true,
      tabPosition: 'top',
      activeIndex: '1',
      activeIndex2: '1',
      phone: '',
      isLoginPage: false
    }
  },
  created () {
    this.phone = cookies.get('phone')
    if (this.phone != null) {
      this.isLoginPage = true
    }
  },
  updated () {
    this.phone = cookies.get('phone')
    if (this.phone != null) {
      this.isLoginPage = true
    }
  },
  methods: {
    reload () {
      this.refresh = false
      // 待 vue 重新渲染后 dom更新后再操作
      this.$nextTick(() => {
        this.refresh = true
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    gotoShoppingCart () {
      this.isLoginPage = false
      if (cookies.get('X-Access-Token') != null) {
        router.replace('/shoppingCart')
      } else {
        Message({
          message: '请先登录',
          type: 'error'
        })
        router.replace('/login')
      }
    },
    gotoIndex () {
      this.isLoginPage = false
      router.replace('/')
    },
    gotoOrder () {
      this.isLoginPage = false
      if (cookies.get('X-Access-Token') != null) {
        router.replace('order')
      } else {
        Message({
          message: '请先登录',
          type: 'error'
        })
        router.replace('/login')
      }
    },
    gotoLogin () {
      router.replace('/login')
      this.isLoginPage = true
    },
    gotoPersonal () {
      this.isLoginPage = false
      if (cookies.get('X-Access-Token') != null) {
        router.replace('/personal')
      } else {
        Message({
          message: '请先登录',
          type: 'error'
        })
        router.replace('/login')
      }
    },
    out () {
      cookies.remove('phone')
      cookies.remove('X-Access-Token')
      this.$GLOBAL.setPhone(null)
      this.$GLOBAL.setToken(null)
      this.isLoginPage = true
      this.phone = null
      router.replace('/login')
    }
  }
}
</script>
<style>
.tab {
  margin: 10px;
  padding: 10px;
}
.el-menu-demo {
  display: flex;
}
.iconFont{
  font-size: 15px;
}
.menu:first-child{
  margin-left: 15vw;
}
.phone{
  color: #ffff;
  font-size: 16px;
  position: absolute;
  right: 5vw;
  top: 1vw;
}
</style>
