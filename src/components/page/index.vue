<template>
  <div style="background-color: #EBEEF5; height:100%; width:100%;">
    <el-header>
      <div class="tagBox">
         <div class="tag" v-for="(item, index) in merchantType" :key ="index">
          <el-button type="text" @click="choiceMerchantType(item.uuid)"><span>{{item.name}}</span></el-button>
        </div>
      </div>
    </el-header>
    <div class="content">
    <div class="centerItemCrew">
        <div class="centerItem" v-for=" (item, index) in merchantList" :key="index">
               <el-card :body-style="{ padding: '0px' }">
                 <div style=" display: flex;flex-wrap: wrap;" @click="gotoGoodsList(item.uuid)">
                   <img :src="item.image" class="image">
                    <div style="padding: 5px;">
                      <div class="bottom clearfix">
                        <time class="describe">{{item.name}}</time>
                      </div>
                      <div class="monthSell">
                        <span>月销:{{item.monthSell}}<br><br>{{item.address}}</span>
                      </div>
                  </div>
                 </div>
            </el-card>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
import router from '../../router/index'
import { Message } from 'element-ui'
import { getMerchantList, getMerchantTypeList } from '../../api/api'
export default {
  name: 'index',
  data () {
    return {
      merchantList: [],
      merchantType: [],
      merchantTypeUuid: ''
    }
  },
  created () {
    this.netWork().getMerchantsList()
    this.netWork().getMerchantTypeList()
  },
  methods: {
    netWork () {
      const self = this
      return {
        // 获取商家列表
        getMerchantsList: async (merchantTypeUuid) => {
          try {
            const params = { merchantTypeUuid: merchantTypeUuid }
            const res = await getMerchantList(params)
            self.merchantList = res.data.result
          } catch (err) {
            Message({
              message: err.data.errMessage,
              type: 'error'
            })
          }
        },
        getMerchantTypeList: async () => {
          try {
            const res = await getMerchantTypeList()
            self.merchantType = res.data.result
          } catch (err) {
            Message({
              message: '商家分类加载失败',
              type: 'error'
            })
          }
        }
      }
    },
    gotoGoodsList (uuid) {
      const url = '/merchantGoodsList/' + uuid
      router.replace(url)
    },
    choiceMerchantType (uuid) {
      this.merchantTypeUuid = uuid
      this.netWork().getMerchantsList(uuid)
    }
  }
}
</script>
<style>
.content {
    width: 100%;
    display: flex;
    justify-content: center;
}
.centerItemCrew {
    width: 85%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 8vw;
}
.centerItem {
    margin: 1vw 1vw 3vw 0vw;
    width: 20%;
    height: 5vw;
}
 .describe {
    font-size: 1vw;
    color: black;
    margin-left: 1vw;
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
    width: 8vw;
    height: 8vw;
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
  .monthSell{
    margin-top: 1vw;
    margin-left: 1vw;
    font-size: 1vw;
    color: #999;
  }
.tag:first-child{
  margin-left: 5vw;
  }
.tagBox{
   display: flex;
   flex-wrap: wrap;
}
.tag{
  margin:1vw;
}
.el-header {
    background-color: #ffffff;
    margin-top: 1vw;
    width: 80%;
    box-shadow: #C0C4CC 1px 2px 0px 0px;
    margin:1vw auto
  }
</style>
