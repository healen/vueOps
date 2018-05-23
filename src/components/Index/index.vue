<template>
    <div class="drainage">
      <div class="fixed">
        <van-nav-bar title="首页"/>
      </div>
      <div class="indexcontent">

        <div class="swipbox">

          <van-swipe :autoplay="3000" >
            <van-swipe-item>
              <img src="./img/im1.png"  style="width: 100%">
            </van-swipe-item>
            <van-swipe-item>
              <img src="./img/im2.png"  style="width: 100%">
            </van-swipe-item>
          </van-swipe>

        </div>

        <van-row>
          <van-col span="8" class="box" v-for="(paper,index) in parer9" :key="index">
            <div class="in" @click="golink(paper.to)">
              <div class="warp">
                <div class="content" :style="{backgroundColor:paper.color}">
                  <van-icon :name="paper.icon" />
                </div>
                <div class="title">
                  {{paper.title}}
                </div>
              </div>
            </div>
          </van-col>
        </van-row>

      </div>





    </div>
</template>

<script>
  export default {
    name: 'Index',
    data(){
      return {
        parer9:[
          {
            title:'基础信息',
            icon:'jichuxinxi',
            to:'basic_info',
            color:'#00a1db'
          },
          {
            title:'流量',
            icon:'opsdrainage',
            to:'stream',
            color:'#3c45bd'
          },
          {
            title:'KFC-PreOrder',
            icon:'wangluo',
            to:'developing',
            color:'#ffb634'
          },
          {
            title:'KFC-delivery',
            icon:'opsrelease',
            to:'developing',
            color:'#ff844d'
          },
          {
            title:'PH-delivery',
            icon:'delivery',
            to:'developing',
            color:'#ff4069'
          },
          {
            title:'开发中...',
            icon:'developing',
            to:'developing',
            color:'#00a0da'
          },
          {
            title:'服务器总量',
            icon:'server',
            to:'chart1',
            color:'#558ae1'
          },
          {
            title:'IDC业务占比',
            icon:'IDCjifang',
            to:'chart2',
            color:'#a35fdf'
          },
          {
            title:'业务服务占比',
            icon:'business',
            to:'chart3',
            color:'#00d500'
          },
        ]
      }
    },
    methods:{
      golink(link){
        this.$router.push(link);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index";
</style>
