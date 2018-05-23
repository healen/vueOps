<template>
  <div class="drainage">
    <div class="fixed">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="系统开发中" left-text="返回"/>
    </div>
    <div class="indexcontent">
      <div class="boxs">
        <div class="contents">
          <van-icon  name="xiaolian1" class="bigicons"/>
          <h3>系统开发中{{dians}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Developing',
    data(){
      return {
        dian:[]
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      }
    },
    computed:{
      dians(){
        let t;
        let _this = this;
        clearInterval(t);
        t = setTimeout(function(){
          if(_this.dian.length<6){
            _this.dian.push('.');
          }else{
            clearInterval(t);
            _this.dian=[];
          }
        },500);
        return this.dian.join('');
      }

    }
  }
</script>

<style lang="less" scoped>
  body{
    background: #fff!important;
  }
  .fixed{
    width: 100%;
    position: fixed;
    z-index: 1;
  }
  .indexcontent{
    box-sizing: border-box;
    padding-top: 4rem;
    padding-bottom: 4.5rem;
    .boxs{
      height: 350px;
      text-align: center;
      padding: 2rem;
      display: -webkit-box;

      -webkit-box-align: center;
      -webkit-box-pack: center;
      .bigicons{
        font-size: 8rem;
        color: #ccc;
      }
      .contents{
        h3{
          font-size: 1.8rem;
          color: #aaa;
        }
      }
    }
  }
</style>
