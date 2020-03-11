<template>
    <div>
      <el-container>
        <el-main>
            <div class="background">
                <div class="loginInput">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="Form" size="small">
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model.number="ruleForm.phone" ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-main>
      </el-container>
    </div>
</template>
<script>
import { register } from '../../api/api'
import router from '../../router/index'
import { Message } from 'element-ui'
export default {
  name: 'login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      }
      if (value.length !== 11 && !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      ruleForm: {
        phone: '',
        pwd: ''
      },
      rules: {
        phone: [
          { validator: validateName, trigger: 'blur' }
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.network().register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    network () {
      const self = this
      return {
        register: async () => {
          const params = {phone: self.ruleForm.phone, pwd: self.ruleForm.pwd}
          try {
            const res = await register(params)
            if (res.status === 200) {
              Message({
                message: '注册成功，赶紧登录点餐吧',
                type: 'success'
              })
              router.replace('/login')
            }
          } catch (err) {
            Message({
              message: err.error.message,
              type: 'error'
            })
          }
        }
      }
    }
  }
}
</script>
<style>
.background{
   background-image: url('../../assets/register.jpg');
   background-size: cover;
   width: 100%;
   margin: auto;
   display: flex;
   height:550px;
   min-height:400px;
   align-items: center;
}
.el-main {
    text-align: center;
    line-height: 160px;
    width: 95%;
    margin: auto;
    height: 80%;
  }
  body > .el-container {
    margin:0px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .loginInput{
      width: 40VW;
      background: #FFFFFF;
      margin:auto;
      width: 25vw;
  }
  .Form{
   width: 20vw;
   padding: 10px;
   padding-top: 50px;
  }
</style>
