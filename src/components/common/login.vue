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
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            <el-button @click="gotoRegister">现在注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-main>
      </el-container>
    </div>
</template>
<script>
import { login } from '../../api/api'
import cookies from 'vue-cookies'
import router from '../../router/index'
import { Message } from 'element-ui'
export default {
  name: 'login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
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
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.network().login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    gotoRegister () {
      router.replace('/register')
    },
    network () {
      const self = this
      return {
        login: async () => {
          const params = {phone: self.ruleForm.phone, pwd: self.ruleForm.pwd}
          try {
            const res = await login(params)
            if (res.status === 200) {
              cookies.set('X-Access-Token', res.data.token)
              cookies.set('phone', res.data.phone)
              this.$GLOBAL.setPhone(res.data.phone)
              this.$GLOBAL.setToken(res.data.token)
              router.replace('/')
              router.go(0)
            }
          } catch (err) {
            console.log(err)
            Message({
              message: '账户名或密码错误',
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
   background-image: url('../../assets/bg.jpg');
   background-size:100% 100%;
   width: 100%;
   margin: auto;
   display: flex;
   align-items: center;
   height:550px;
   min-height:400px;
   border:1px solid #000;
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
