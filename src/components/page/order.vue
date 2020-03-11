<template>
<div class="order" v-loading="loading">
     <el-tabs>
         <el-table :data="orderData" border style="width:100%">
           <el-table-column prop="uuid" label="订单编号" ></el-table-column>
           <el-table-column prop="address" label="收货地址" width="200"></el-table-column>
           <el-table-column prop="phone" label="收货手机" width="120"></el-table-column>
           <el-table-column prop="count" label="总交易额" width="100"></el-table-column>
           <el-table-column prop="startTime" label="交易开始时间" width="200"></el-table-column>
           <el-table-column prop="status" type="index" label="订单状态" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.status===1">
                <span class="isPay">已完成</span>
              </div>
              <div v-else>
                <span >待付款</span>
              </div>
             </template>
           </el-table-column>
             <el-table-column  label="操作"  width="120">
                <template slot-scope="scope">
                  <el-popover placement="left" width="300" trigger="click">
                      <el-table :data="scope.row.orderMenuVOS">
                        <el-table-column width="100" property="name" label="商品名称"></el-table-column>
                        <el-table-column width="100" property="price" label="商品单价"></el-table-column>
                        <el-table-column width="100" property="num" label="商品数量"></el-table-column>
                      </el-table>
                      <el-button type="text" slot="reference">查看</el-button>
                  </el-popover>
                   <!-- <el-button type="text" style="color:red" @click="deleteOrder(scope.row.uuid)">删除</el-button> -->
                   <el-button type="text" @click="isDeleted(scope.row.uuid)" style="color:red;">删除</el-button>
                </template>
             </el-table-column>
            <el-table-column  label="支付方式" fixed="right" width="120">
              <template slot-scope="scope">
              <a href="https://www.alipay.com/" target="blank" @click="updateOrderStatus(scope.row.uuid)">支付宝</a>
              </template>
            </el-table-column>
         </el-table>
     </el-tabs>
       <el-dialog title="确定删除吗" :visible.sync="centerDialogVisible" width="20%" center>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteOrder">确 定</el-button>
        </span>
       </el-dialog>
</div>
</template>
<script>
import { showOrder, updateOrderStatus, deleteOrders } from '../../api/api'
import { Message } from 'element-ui'
export default {
  name: 'order',
  data () {
    return {
      orderData: [],
      orderMenu: [],
      loading: false,
      centerDialogVisible: false,
      goingToDeletedOrderUuid: ''
    }
  },
  created () {
    this.netWork().getOrderData()
  },
  methods: {
    netWork () {
      const self = this
      return {
        getOrderData: async () => {
          try {
            self.loading = true
            const res = await showOrder()
            // 将获取的数据赋值
            self.orderData = res.data.result
            self.loading = false
          } catch (err) {
            self.loading = false
            console.log('------', err)
          }
        },
        updateOrderStatus: async (params) => {
          try {
            await updateOrderStatus(params)
            Message({
              message: '支付成功',
              type: 'success'
            })
          } catch (err) {
            Message({
              message: '支付失败',
              type: 'error'
            })
          }
        },
        deleteOrder: async (params) => {
          try {
            const res = await deleteOrders(params)
            Message({
              message: res.data.result,
              type: 'success'
            })
          } catch (err) {
            Message({
              message: '删除失败',
              type: 'error'
            })
          }
        }
      }
    },
    deleteOrder () {
      const params = { orderUuid: this.goingToDeletedOrderUuid }
      this.loading = true
      this.netWork().deleteOrder(params)
      this.orderData.forEach((item, index) => {
        if (item.uuid === this.goingToDeletedOrderUuid) {
          this.orderData.splice(index, 1)
        }
      })
      this.loading = false
      this.centerDialogVisible = false
    },
    updateOrderStatus (uuid) {
      const params = { orderUuid: uuid }
      this.netWork().updateOrderStatus(params)
      this.orderData.forEach((item, index) => {
        if (item.uuid === uuid) {
          item.status = 1
        }
      })
    },
    isDeleted (uuid) {
      this.centerDialogVisible = true
      this.goingToDeletedOrderUuid = uuid
    }
  }
}
</script>
<style scoped>
.isPay{
  color:#67C23A;
  font-family: Microsoft YaHei;
}
</style>
