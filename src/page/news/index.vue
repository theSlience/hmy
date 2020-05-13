<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-12 09:16:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-12 09:22:44
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
                      height
                      stripe>
              <el-table-column type="selection"
                               width="55px"></el-table-column>
              <el-table-column prop="time"
                               label="时间"></el-table-column>
              <el-table-column prop="title"
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      news: [
        {
          time: '2020.5.12',
          title: '新闻',
          content: '好好学习，天天向上。好好学习，天天向上。',
          type: '热点新闻'
        },
        {
          time: '2020.5.12',
          title: '新闻',
          content: '好好学习，天天向上。好好学习，天天向上。',
          type: '热点新闻'
        },
        {
          time: '2020.5.12',
          title: '新闻',
          content: '好好学习，天天向上。好好学习，天天向上。',
          type: '热点新闻'
        },
        {
          time: '2020.5.12',
          title: '新闻',
          content: '好好学习，天天向上。好好学习，天天向上。',
          type: '热点新闻'
        },
        {
          time: '2020.5.12',
          title: '新闻',
          content: '好好学习，天天向上。好好学习，天天向上。',
          type: '热点新闻'
        }
      ]
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
}
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
</style>
