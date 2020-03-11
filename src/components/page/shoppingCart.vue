<template>
<div class="contet" v-loading="loading" v-if="refresh">
    <div>
        <el-tabs>
         <el-table :data="shoppingCartData" border style="width:100%;" >
           <el-table-column prop="goodsName" label="商品名称" ></el-table-column>
             <el-table-column prop="goodsPicture" label="商品图片" width="120"  >
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src= scope.row.goodsPicture
                      :fit="fit">
                    </el-image>
                  </template>
             </el-table-column>
           <el-table-column prop="goodsPrice" label="商品金额" width="100" ></el-table-column>
             <el-table-column  label="操作" fixed="right" width="200">
               <template slot-scope="scope">
                <el-input-number size="mini" v-model="scope.row.goodsNum" @change="handleChange(scope.row.goodsNum,scope.row.goodsUuid)" :min="0" :max="999"></el-input-number>
               </template>
             </el-table-column>
         </el-table>
         <div class="totalCost">
           <div class="amount">
             <span>￥<span style="color:red; font-size:30px;">{{totalCost}}</span> 元</span>
           </div>
         </div>
          <div class="btn">
           <span><el-button class="btn1" style="width:10vw" type="success" size="medium" @click="makeOrder">结算</el-button></span>
         </div>
     </el-tabs>
  </div>
</div>
</template>
<script>
import { showCart, uodateShoppingCartGoodsNum, makeOrder } from '../../api/api'
import { Message } from 'element-ui'
export default {
  name: 'index',
  data () {
    return {
      show: true,
      shoppingCartData: [],
      fit: 'contain',
      totalCost: 0,
      loading: false,
      refresh: true
    }
  },
  created () {
    this.netWork().showCartData()
  },
  mounted () {
  },
  methods: {
    //  + - 按钮 触发事件
    handleChange (num, uuid) {
      const params = { goodsUuid: uuid, goodsNum: num }
      this.netWork().updateCartGoodsNum(params)
      this.totalCost = 0
      // 循环遍历商品列表
      this.shoppingCartData.forEach((item, index) => {
        this.totalCost = item.goodsPrice * item.goodsNum + this.totalCost
        // 如果减到 0 从商品列表数据删除
        if (item.goodsUuid === uuid && num === 0) {
          this.shoppingCartData.splice(index, 1)
        }
      })
    },
    reload () {
      this.refresh = false
      // 待 vue 重新渲染后 dom更新后再操作
      this.$nextTick(() => {
        this.refresh = true
      })
    },
    netWork () {
      const self = this
      return {
        showCartData: async () => {
          this.loading = true
          try {
            const res = await showCart()
            this.shoppingCartData = res.data.result
            // 统计金额
            this.totalCost = 0
            this.shoppingCartData.forEach((item, index) => {
              this.totalCost = item.goodsPrice * item.goodsNum + this.totalCost
            })
            this.loading = false
          } catch (err) {
            this.loading = false
          }
        },
        updateCartGoodsNum: async (params) => {
          self.loading = true
          try {
            const res = await uodateShoppingCartGoodsNum(params)
            Message({
              message: res.data.result,
              type: 'success'
            })
            self.loading = false
          } catch (err) {
            Message({
              message: '操作失败，请稍后再试',
              type: 'error'
            })
            self.loading = false
          }
        },
        // 结算
        order: async () => {
          self.loading = true
          try {
            await makeOrder()
            self.loading = false
            // 清空购物车列表
            self.shoppingCartData = []
            // 总结设为0
            this.totalCost = 0
            Message({
              message: '结算成功，请前往购物车查看',
              type: 'success'
            })
          } catch (err) {
            self.loading = false
            Message({
              message: err.data.errMessage,
              type: 'error'
            })
          }
        }
      }
    },
    makeOrder () {
      this.netWork().order()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  padding-top: 8px;
  margin: auto;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
}
.btn1{

  margin: 15px 18px 5px 0px;
}
.totalCost{
  font-family: "PingFang SC";
  color:#E6A23C;
}
.amount{
display: flex;
margin-right: 2vw;
margin-top: 2vw;
justify-content: flex-end;
}
</style>
