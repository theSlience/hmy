<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-11 10:11:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-11 13:28:31
 -->
<template>
  <div class="header-footer">
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
            <div><span>添加文章</span></div>
            <div><span>修改文章</span></div>
            <div><span>搜索文章</span></div>
            <div><span>用户预留信息</span></div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="header-account">
            <span>
              退出账户
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="footer">
      <div class="footer-record">©2019 环美亚国际教育 版权所有</div>
    </div>
  </div>
</template>
<style scoped>
/* h3和h5标签外边距清零 */
h3,
h5 {
  margin: 0px;
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
/* 尾部样式以及垂直居中对齐 */
.footer {
  height: 40px;
  color: azure;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(44, 62, 80, 1);
}
</style>