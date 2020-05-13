<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-13 10:22:44
 -->
<template>
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
              <el-table-column prop="time"
                               label="日期"></el-table-column>
              <el-table-column prop="newsTitle"
                               label="标题"></el-table-column>
              <el-table-column prop="content"
                               label="内容"></el-table-column>
              <el-table-column prop="pic"
                               label="图片"></el-table-column>
              <el-table-column prop="type"
                               label="类型"></el-table-column>
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
                 :model="addnews"
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-form>
          <el-form-item label="标题"
                        prop="title">
            <el-input v-model="addnews.title"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容"
                        prop="content">
            <el-input v-model="addnews.content"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片"
                        prop="pic"></el-form-item>
          <el-form-item label="类型"
                        prop="title">
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
          <el-button type="primary">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialogVisible: false,
      addnews: {
        title: null,
        content: null,
        img: null,
        type: null
      },
      news: []
    }
  },
  methods: {
    // 点击添加新闻打开模态框
    opendialogVisible() {
      ;(this.addnews = {
        title: null,
        content: null,
        img: null,
        type: null
      }),
        (this.dialogVisible = true)
    },
    getnews() {
      this.$axios.get('/api/news/findAll').then(res => {
          this.news=res.data;
          console.log(res.data)
      })
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
</style>
