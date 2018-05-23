<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <van-tabbar v-model="active" class="bottombar">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="opsrelease" to="release">发版</van-tabbar-item>
      <van-tabbar-item icon="opsdrainage" to="stream">引流</van-tabbar-item>
      <van-tabbar-item icon="opstools" to="developing">工具</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  import apiList from '@/service/apiList';

  export default {
  name: 'App',
  data(){
    return {
      active:0,
      transitionName:''
    }
  },
  mounted(){
    const routeName = this.$route.name;
    switch (routeName){
      case 'Index':
        this.active=0;
        break;
      case 'Tools':
        this.active=3;
        break;
      case 'Release':
        this.active=1;
        break;
      case 'Drainage':
      case 'Stream':
        this.active=2;
        break;
      default:break;
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>
<style>
  @import "./vant-css/index.css";
</style>
<style leng="less">
  @import "./static/comstomico/index.less";
  @import "./static/reset.less";
</style>
