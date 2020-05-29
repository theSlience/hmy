<template>
  <header>
    <div class="header-content">
      <div class="header">
        <el-row>
          <el-col :span="4">
            <div class="header-logo">
              <div>
                <img src="../assets/logo.png"
                     alt="">
              </div>
              <div>
                <h3>
                  环美亚后台
                </h3>
                <h5>
                  hmyedu.com
                </h5>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="header-tabs">
              <router-link to="/news">
                <div><span>热点新闻</span></div>
              </router-link>
              <router-link to="/user">
                <div><span>用户预留信息</span></div>
              </router-link>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="header-account">
              <a href="#"
                 @click.prevent="logout">
                退出账户
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="hr">
        <hr>
      </div>
      <div class="container">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <!-- 
    <div class="footer">
      <div class="footer-record">©2019 环美亚国际教育 版权所有</div>
      <input placeholder="">
    </div>
    -->
    </div>
  </header>
</template>
<script>
import { constants } from 'crypto'
export default {
  data() {
    return {}
  },
  methods: {
    // 退出功能
    logout() {
      this.$axios.post('/api/user/logout')
      // 弹出确认对话框
      // 点击确认后，跳回用户登录页面，清除token
      this.$confirm('请确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          // 确认退出，清除token
          localStorage.removeItem('token')
          // 跳转登录页面
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style scoped>
.el-col-16 {
  display: flex;
}
/* h3和h5标签外边距清零 */
h3,
h5 {
  margin: 0px;
}
a {
  text-decoration: none;
}

/* 头部宽高以及颜色 */
.header {
  width: 100%;
  height: 30px;
  color: rgba(44, 62, 80, 1);
}
.el-row {
  display: block;
}
/* 左右两侧内容居中显示 */
.el-col-4 {
  text-align: center;
}
/* 头部logo图片宽高 */
.header img {
  width: 42px;
  height: 42px;
}
.header-logo,
.header-tabs {
  display: inline-flex;
}
/* 头部中间菜单样式 */
.header-tabs div {
  height: 46px;
  display: flex;
  align-items: center;
  margin-right: 50px;
  color: rgba(41, 128, 185, 1);
}
.header-tabs div:hover {
  color: #000;
}
/* 鼠标悬停样式 */
.header-tabs,
.header-account span {
  cursor: pointer;
}
.header-account {
  height: 46px;
  display: flex;
  align-items: center;
  color: rgba(41, 128, 185, 1);
}
.header-account a {
  color: #000;
}
.hr {
  margin-top: 20px;
}
</style>