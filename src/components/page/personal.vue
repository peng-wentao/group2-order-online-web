<template>
    <div class="personalBox" v-loading="loading">
        <div class="nav">
            <el-col :span="4" >
                <h5>个人中心</h5>
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="1">
                    <span slot="title" @click="selectAboutMe">关于我</span>
                </el-menu-item>
                <el-menu-item index="1">
                    <span slot="title" @click="selectChangePwd">修改密码</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title" @click="selectAddressManage">地址管理</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </div>
        <div v-if="!hide" class="userInfo">
            <el-image style="width: 100px; height: 100px; margin-left:1vw; margin-top:1vw;" :src="headurl" :fit="fit"></el-image>
            <div class="userInfoName">
                <span>累计积分: <span style="color:red; margin-left:5px;">99</span><span style="font-size:10px; margin-left:3px;">分</span></span>
            </div>
            <div  class="userInfoHistoryOrder">
                <span>历史订单数:<span style="color:red; margin-left:5px;">{{totalOrderCount}}</span><span style="font-size:10px; margin-left:3px;">单</span></span>
            </div>
        </div>
        <div  v-if="!hide" class="rencentlyOrder">
          <h5>最近订单</h5>
           <el-table :data="recentlyOrders" size="mini">
              <el-table-column  prop="merchantName" label="商家" width="180"></el-table-column>
              <el-table-column prop="amount" label="交易额"  width="180"></el-table-column>
                            <el-table-column prop="address" label="收货地址" ></el-table-column>
           </el-table>
        </div>
        <div class="mode">
            <div v-if="mode === 'pwd'">
                <el-card class="box-card">
                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldPass">
                        <el-input v-model.number="ruleForm.oldPass"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            </div>
            <div v-if="mode === 'address'">
                <el-table :data="delivery" style="width: 100%">
                    <el-table-column prop="address" label="收货地址"></el-table-column>
                    <el-table-column prop="phone" label="联系手机" width="180"></el-table-column>
                    <el-table-column label="是否默认" prop ="isMain" width="100">
                     <template slot-scope="scope">
                       <div v-if="scope.row.isMain === 1">
                          <span>是</span>
                       </div>
                        <div v-else>
                          <span>否</span>
                       </div>
                     </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                      <template slot-scope="scope">
                        <el-button type="text" @click="setMainDelivery(scope.row.uuid)"><span style="color:green">设为默认</span></el-button>
                        <el-button type="text" @click="deleteDelivery(scope.row.uuid)"><span style="color:red">删除</span></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button style="margin-top:1vw;" round type="primary" @click="dialogFormVisible = true">新增地址，收货人</el-button>
                  <el-dialog title="收货地址、收货人" :visible.sync="dialogFormVisible">
                      <el-form :model="deliveryForm">
                        <el-form-item label="新增收货信息" :label-width="formLabelWidth">
                          <el-input v-model="deliveryForm.address" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系手机" :label-width="formLabelWidth">
                          <el-input v-model="deliveryForm.phone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否选为默认" :label-width="formLabelWidth">
                          <el-select v-model="deliveryForm.isMain" placeholder="请选择是否选为默认地址">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addDelivery(deliveryForm.address,deliveryForm.phone,deliveryForm.isMain)">确 定</el-button>
                      </div>
                  </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import { updatePwd, getDelivery, addDelivery, deleteDelivery, setMainDelivery, queryTotalOrders, getRecentlyOrders } from '../../api/api'
import cookies from 'vue-cookies'
import router from '../../router/index'
import { Message } from 'element-ui'
export default {
  name: 'personal',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      delivery: [],
      recentlyOrders: [],
      dialogTableVisible: false,
      dialogFormVisible: false,

      deliveryForm: {
        address: '',
        phone: '',
        isMain: ''
      },
      formLabelWidth: '120px',
      totalOrderCount: 0,
      mode: '',
      hide: false,
      username: '',
      fit: 'contain',
      loading: false,
      headurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560630325376&di=a7bc34fb8c5c97bcd93f9c3643ad2b83&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180305%2F9920d81a1ca34ac8acaf6632e5ba3b01.jpeg'
    }
  },
  created () {
    this.username = cookies.get('userName')
    this.netWork().getDelivery()
    this.netWork().getTotalOrderCount()
    this.netWork().queryRencentlyOrder()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.netWork().reSetPwd()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addDelivery (address, phone, isMain) {
      this.dialogFormVisible = false
      const params = { address: address, phone: phone, isMain: isMain }
      this.netWork().addDelivery(params)
    },
    deleteDelivery (uuid) {
      const params = { addressUuid: uuid }
      this.netWork().deleteDelivery(params)
      // 丛数组中删除
      this.delivery.forEach((item, index) => {
        if (item.uuid === uuid) {
          this.delivery.splice(index, 1)
        }
      })
    },
    setMainDelivery (uuid) {
      const params = { addressUuid: uuid }
      this.netWork().setMainDelivery(params)
    },
    selectChangePwd () {
      this.mode = 'pwd'
      this.hide = true
    },
    selectAddressManage () {
      this.mode = 'address'
      this.hide = true
    },
    selectAboutMe () {
      this.hide = false
      this.mode = ''
    },
    netWork () {
      const self = this
      return {
        reSetPwd: async () => {
          try {
            this.loading = true
            const params = { pwd: self.ruleForm.oldPass, newPwd: self.ruleForm.pass }
            const res = await updatePwd(params)
            Message({
              message: res.data.result,
              type: 'success'
            })
            cookies.remove('X-Access-Token')
            cookies.remove('userName')
            this.loading = false
            router.replace('/login')
          } catch (err) {
            Message({
              message: err.data.error.message,
              type: 'error'
            })
          }
        },
        getDelivery: async () => {
          try {
            this.loading = true
            const res = await getDelivery()
            self.delivery = res.data.result
            this.loading = false
          } catch (err) {
            Message({
              message: '获取收货地址失败',
              type: 'error'
            })
            this.loading = false
          }
        },
        addDelivery: async (params) => {
          try {
            this.loading = true
            const res = await addDelivery(params)
            Message({
              message: res.data.result,
              type: 'success'
            })
            const res2 = await getDelivery()
            self.delivery = res2.data.result
            this.loading = false
          } catch (err) {
            console.log('-----', err)
            Message({
              message: '新增地址地址失败',
              type: 'error'
            })
            this.loading = false
          }
        },
        deleteDelivery: async (params) => {
          try {
            const res = await deleteDelivery(params)
            Message({
              message: res.data.result,
              type: 'success'
            })
          } catch (err) {
            Message({
              message: '删除地址失败',
              type: 'error'
            })
          }
        },
        setMainDelivery: async (params) => {
          try {
            const res = await setMainDelivery(params)
            const res2 = await getDelivery()
            self.delivery = res2.data.result
            Message({
              message: res.data.result,
              type: 'success'
            })
          } catch (err) {
            Message({
              message: '设置默认失败败',
              type: 'error'
            })
          }
        },
        getTotalOrderCount: async () => {
          try {
            const res = await queryTotalOrders()
            self.totalOrderCount = res.data.result
          } catch (err) {
            self.totalOrderCount = 0
          }
        },
        queryRencentlyOrder: async () => {
          try {
            const res = await getRecentlyOrders()
            self.recentlyOrders = res.data.result
          } catch (err) {
            Message({
              message: '获取最近订单失败',
              type: 'error'
            })
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
    margin: auto;
  }

.personalBox{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
}
.nav{
  width: 100%;
  margin-top: -1vw;
  margin-left: 10vw;
}
.mode{
    width: 80%;
    margin-left: 25vw;
    margin-top: -10vw;
}
.userInfo{
    width: 35vw;
    background-color: #ffff;
    margin-left: 25vw;
    margin-top: -10vw;
    display: flex;
    flex-wrap: wrap;
    height: 8vw;
}
.userInfoName{
    line-height: 100px;
    width: 10vw;
    margin-left: 2vw;
    margin-top:1vw;
    height: 6vw;
    color:#303133;
    box-shadow: #C0C4CC 1px 0px 0px 0px;
}
.userInfoHistoryOrder{
    line-height: 100px;
    width: 10vw;
    margin-top:1vw;
    height: 3vw;
    margin-left: 1vw;
    color:#303133;
}
.personalData{
    margin-top: 2vw;
    margin-left: 2vw;
}
.rencentlyOrder{
  margin-left: 25vw;
  width: 50vw;
}
</style>
