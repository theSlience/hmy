<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-15 15:24:14
 -->
<template>
  <div>
    <my-header></my-header>
    <div style="display:flex;">
      <div class="content">
        <el-row>
          <el-col>
            <template>
              <el-table :data="msg"
                        style="width:100%"
                        stripe>
                <el-table-column prop="msgName"
                                 label="姓名"></el-table-column>
                <el-table-column prop="msgPhone"
                                 label="电话"></el-table-column>
                <div onmouseover="this.className='.show'"
                     onmouseout="this.className='.cell'">
                  <el-table-column prop="msgContent"
                                   label="内容">
                  </el-table-column>
                </div>
                <el-table-column prop="msgEmail"
                                 label="邮箱"></el-table-column>
                <el-table-column prop="addTime"
                                 label="预留时间"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="msg">
                    <div>
                      <el-button type="danger"
                                 size="medium"
                                 icon="el-icon-delete"
                                 @click.native.prevent="handleDelete(msg.row.msgId)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-col>
        </el-row>
        <!-- 分页功能 -->
        <el-pagination background
                       layout="total,prev, pager, next"
                       :total="page.total"
                       :current-page="page.pageNum"
                       :page-size="page.pageSize"
                       @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import myHeader from '../../components/header'
export default {
  data() {
    return {
      msg: [],
      page: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      }
    }
  },
  components: {
    myHeader
  },
  //   页面初始化需要进行数据渲染
  created() {
    this.getMsg()
  },
  methods: {
    // 获取后台用戶数据
    getMsg(pageNum) {
      this.$axios
        .get('/api/message/findAll/' + this.page.pageNum)
        .then(res => {
          if(res.data.uAuth === 'true'){
             this.$message.error('您已退出登陆，请重新登陆')
             return this.$router.push('/login')
          }
          this.msg = res.data.date.list
          
        })
        .catch(err => {})
    },
    currentChange(pageNum) {
      this.page.pageNum = pageNum
      this.getMsg()
    },
    // 删除操作
    //根据msgId删除用戶信息
    async handleDelete(msgId) {
      const confirmResult = await this.$confirm('是否删除此条新闻？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 确认删除则返回字符串 confirm
      // 取消返回 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$axios
        .delete('/api/message/deleteOne/' + msgId)
        .then(res => {
          if (this.success == true) {
            return this.$message.error('删除用户信息失败')
          }
          this.$message.success('删除用户信息成功')
          // 刷新列表
          this.getMsg()
        })
    },
    mounted() {
      this.getMsg()
    }
  }
}
</script>
<style scopd>
.el-col-16 {
  display: flex;
}
.content {
  width: 1300px;
  height: 100%;
  margin: 0 auto;
}
.el-table .cell {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-table .cell:hover {
  overflow: auto;
  text-overflow: clip;
}
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.el-dialog__header {
  padding: 10px 20px 0px;
}
.el-dialog__body {
  padding: 10px 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-form-item__content {
  line-height: 0px;
  text-align: left;
}
.el-pagination {
  padding: 2px 0px;
  text-align: right;
}
.el-pagination.is-background .btn-next {
  margin: 0px;
}
</style>
