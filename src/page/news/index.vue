<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-16 17:13:58
 -->
<template>
  <div>
    <my-header></my-header>
    <div style="display:flex;">
      <div class="content">
        <el-row>
          <el-col :span="16">
            <el-button @click="opendialogVisible()"
                       icon="el-icon-plus">
              添加新闻
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <template>
              <el-table :data="news"
                        style="width:100%"
                        stripe>
                <el-table-column type="selection"
                                 width="55px"></el-table-column>
                <el-table-column prop="addTime"
                                 label="日期"></el-table-column>
                <el-table-column prop="newsTitle"
                                 label="标题"></el-table-column>
                <el-table-column prop="newsContent"
                                 label="内容"></el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row.img"
                         style="width: 100px;height:50px"></template>
                </el-table-column>
                <el-table-column prop="newsType"
                                 label="类型">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.newsType == '1' ? '' : scope.row.newsType== '2'?'danger':'success'">{{scope.row.newsType== '1' ? "热点新闻" :scope.row.newsType==
            '2'?"官方报道":"校区活动"}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="news">
                    <div style="display:flex;">
                      <el-button icon="el-icon-edit"
                                 size="medium">编辑</el-button>
                      <el-button type="danger"
                                 size="medium"
                                 icon="el-icon-delete"
                                 @click.native.prevent="handleDelete(news.row.newsId)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-col>
        </el-row>
        <!-- 添加模态框 -->
        <el-dialog title="添加/修改新闻"
                   :visible.sync="dialogVisible"
                   width="30%">
          <el-form ref="newsForm"
                   :model="newsForm"
                   enctype="multipart/form-data">
            <el-form-item label="标题"
                          prop="newsTitle">
              <el-input v-model="newsForm.newsTitle"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容"
                          prop="newsContent">
              <el-input v-model="newsForm.newsContent"
                        autocomplete="off"
                        type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="图片"
                          prop="file"
                          type="file">
              <el-upload class="avatar-uploader"
                         action="/api/news/add"
                         :auto-upload="false"
                         ref="upload"
                         :data="newsForm"
                         :on-success="handleAvatarUpload"
                         :before-upload="beforeAvatarUpload">
                <img v-if="newsForm.imgUrl"
                     :src="newsForm.imgUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="类型"
                          prop="newsType">
              <el-radio-group v-model="newsForm.newsType">
                <div style="display:flex;">
                  <el-radio border
                            v-for="item in newsTypeOptions"
                            :key="item.newsType"
                            :label="item.newsType">{{item.Text}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary"
                       @click="submitForm('newsForm')">确定</el-button>
          </span>
        </el-dialog>
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
      dialogVisible: false,
      news: [],
      newsForm: {
        newsTitle: '',
        newsContent: '',
        imgUrl: '',
        newsType: ''
      },
      newsTypeOptions: [
        { newsType: 1, Text: '热点新闻' },
        { newsType: 2, Text: '官方报道' },
        { newsType: 3, Text: '校区活动' }
      ],
      img: '',
      imgUrl: ''
    }
  },
  components: {
    myHeader
  },
  //   页面初始化需要进行数据渲染
  created() {
    this.getNews()
  },
  mounted() {
    this.getNews()
  },
  methods: {
    // 点击添加新闻按钮打开模态框
    opendialogVisible() {
      this.dialogVisible = true
    },
    // 获取后台新闻数据
    getNews() {
      this.$axios
        .get('/api/news/findAll')
        .then(res => {
          this.news = res.data.list
        })
        .catch(err => {})
    },
    newstype(newsType) {
      if (newsType === 1) {
        return '热点新闻'
      } else if (newsType === 2) {
        return '官方报道'
      } else if (newsType === 3) {
        return '校区活动'
      }
    },
    submitForm(formName) {
      let vm = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          vm.$refs.upload.submit()
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.getNews()
        } else {
          return false
        }
      })
    },
    handleAvatarUpload(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isJPG) {
        this.$message.error('上传新闻图片只能是 JPG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传新闻图片大小不能超过 4MB!')
      }
      return isJPG && isLt4M
    },
    // 删除操作
    //根据newsId删除新闻
    async handleDelete(newsId) {
      console.log(newsId)
      const confirmResult = await this.$confirm('是否删除此条新闻？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // console.log(confirmResult);
      // 确认删除则返回字符串 confirm
      // 取消返回 cancel

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$axios
        .delete('/api/news/deleteOne/' + newsId)
        .then(res => {
          if (this.success == true) {
            return this.$message.error('删除用户失败')
          }
          this.$message.success('删除用户成功')
          // 刷新列表
          this.getNews()
        })
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
</style>
