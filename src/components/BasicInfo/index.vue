<template>
  <div class="drainage">


    <div class="fixed">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="基础信息" left-text="返回"/>
    </div>

    <div class="indexcontent">
      <van-cell-swipe :right-width="45" :left-width="65">
        <van-cell-group>
          <van-cell title="主机名称" value="" />
          <van-cell title="系统信息" value="" />
          <van-cell title="CPU架构" value="" />
          <van-cell title="CPU信息" value="" />
          <van-cell title="Python版本" value="" />
          <van-cell title="Ansible版本	" value="" />
        </van-cell-group>
      </van-cell-swipe>
    </div>




    </div>


</template>

<script>
  export default {
    name: 'BasicInfo',
    data () {
      return {}
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
