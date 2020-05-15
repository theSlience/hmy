<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-13 19:31:05
 -->
<template>
  <div style="display:flex;">
    <my-header></my-header>
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
                <template>
                  <div style="display:flex;">
                    <el-button icon="el-icon-edit"
                               size="medium">编辑</el-button>
                    <el-button type="danger"
                               size="medium"
                               icon="el-icon-delete">删除</el-button>
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
        <el-form ref="newsFrom"
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
                        prop="imgUrl">
            <el-upload class="avatar-uploader"
                       action="/api/news/add"
                       :show-file-list="false"
                       :on-success="handleAvatarUpload"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imgUrl"
                   :src="imgUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型"
                        prop="newsType">
            <el-radio-group>
              <div style="display:flex;">
                <el-radio border
                          :label="1">热点新闻</el-radio>
                <el-radio border
                          :label="2">官方报道</el-radio>
                <el-radio border
                          :label="3">校区活动</el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary"
                     @click="addnews()">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import myHeader from ''
export default {
  data() {
    return {
      dialogVisible: false,
      news: [],
      newsForm: {
        newsTitle: '',
        newsContent: ''
      },
      img: '',
      imgUrl: ''
    }
  },
  //   页面初始化需要进行数据渲染
  created() {
    this.getnews()
  },
  methods: {
    // 点击添加新闻按钮打开模态框
    opendialogVisible() {
      //   ;(this.addnews = {
      //     newsTitle: null,
      //     newsContent: null
      //   }),
      this.dialogVisible = true
    },
    // 获取后台新闻数据
    getnews() {
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
    // 提交增加新闻表单
    addnews() {
      let newsList = this.newsForm
      let { newsTitle, newsContent } = newsList
      // 判断数据是否为空
      if (newsTitle == '' || newsContent == '') {
        this.message.error('新增内容每一项不能为空！')
      } else {
        this.$axios.post('/api/news/add', this.newsForm).then(res => {})
      }
    },
    handleAvatarUpload(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scopd>
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
}
</style>
