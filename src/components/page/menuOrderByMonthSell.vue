<template>
    <div>
      <div class="content">
      <div class="goodscenterItemCrew">
        <div class="goodsCenterItem" v-for="(item, index) in  goodsList" :key="index">
               <el-card :body-style="{ padding: '0px' }" style="width:19vw; height:8vw">
                 <div style=" display: flex;flex-wrap: wrap; height:8vw;">
                   <img :src="item.picture" class="image">
                    <div class="goodsInfo"><span>{{item.name}}</span>
                      <div class="price"><span>￥:{{item.price}}</span></div>
                       <div class="addToCart"><el-button size="mini" type="primary" @click="addToCart(item.uuid)">加入购物车</el-button></div>
                    </div>
                 </div>
            </el-card>
        </div>
      </div>
   </div>
   <div class="page">
          <el-pagination background layout="prev, pager, next" :current-page="pageIndex" :total="total" :page-size="pageSize" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import { getMenuList, addToCart } from '../../api/api'
import { Message } from 'element-ui'
export default {
  name: 'menuByPrice',
  data () {
    return {
      goodsList: [],
      pageIndex: 1,
      pageSize: 0,
      total: 0,
      merchantUuid: ''
    }
  },
  created () {
    this.merchantUuid = this.$route.params.merchantUuid
    const orderType = 2
    const params = { merchantUuid: this.merchantUuid, pageIndex: this.pageIndex, orderType: orderType }
    this.netWork().getMenu(params)
  },
  methods: {
    netWork () {
      const self = this
      return {
        getMenu: async (params) => {
          try {
            const res = await getMenuList(params)
            self.goodsList = res.data.result
            self.total = res.data.total
            self.pageSize = res.data.result.length
          } catch (err) {
            Message({
              message: err.data.errMessage,
              type: 'error'
            })
          }
        },
        addToCart: async (params) => {
          try {
            await addToCart(params)
            Message({
              message: '添加成功',
              type: 'success'
            })
          } catch (err) {
            Message({
              message: err.data.errMessage,
              type: 'error'
            })
          }
        }
      }
    },
    addToCart (uuid) {
      const params = { goodsUuid: uuid }
      this.netWork().addToCart(params)
    },
    currentChange (currentPage) {
      const orderType = 2
      this.pageIndex = currentPage
      const params = { merchantUuid: this.merchantUuid, pageIndex: this.pageIndex, orderType: orderType }
      this.netWork().getMenu(params)
    }
  }
}
</script>
<style scoped>
.content {
  width: 100%;
  display: flex;
  justify-content: left;
}
.goodscenterItemCrew {
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
.goodsCenterItem {
    width: 18vw;
    margin:1vw 1vw 0 1vw;
}
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 7vw;
    height: 7vw;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .price{
    font-size: 14px;
    height: 1vw;
    margin-top:1vw;
    color:red;
  }
  .goodsInfo{
    margin-top: 1vw;
    margin-left: 1vw;
    font-size: 16px;
    height: 2vw;
    color:#303133;
  }
  .addToCart{
     margin-left:3vw;
  }
.page{
  position:fixed; bottom:8vw;  left: 2vw; width:100%
}
</style>
