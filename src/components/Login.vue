<template>
  <div id="login">
    <div class="loginToHome">
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="ruleForm"
               status-icon
               label-width="80px"
               class="loginForm">
        <h3>登陆</h3>
        <el-form-item label="用户名"
                      prop="userName">
          <el-input type="text"
                    v-model="loginForm.userName"
                    auto-complete="off"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="userPwd">
          <el-input type="password"
                    v-model="loginForm.userPwd"
                    auto-complete="off"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="homeBut"
                     type="primary"
                     plain
                     @click="login(loginForm)"
                     :loading="logining">登录</el-button>
          <el-button class="loginBut"
                     type="primary"
                     plain
                     @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>
// import { myLogin } from '../service/index.js'
import axios from 'axios'
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        userName: '',
        userPwd: ''
      },
      ruleForm: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login(loginForm) {
      const that = this;
      this.$axios
        .post('/api/user/login',loginForm)
        .then(res => {
          if (res.data.success === 'true') {
            this.$message.success('登陆成功')
            return that.$router.push('/news')
          } else{
             return this.$message.error('登陆失败')
          }
          //   this.news = res.data.list
        })
        .catch(err => {})
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style>
.loginToHome {
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  height: 260px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #dcdfe6;
}
.loginForm {
  text-align: center;
  padding-top: 15px;
  padding-right: 30px;
  top: 10px;
}
.homeBut {
  position: absolute;
  left: 0px;
}
.loginBut {
  position: absolute;
  right: 0px;
}
</style>
