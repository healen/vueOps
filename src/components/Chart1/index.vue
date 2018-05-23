<template>
  <div class="drainage">
    <div class="fixed">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="服务器总量" left-text="返回"/>
    </div>
    <div class="indexcontent">
      <div class="echarts">
        <IEcharts :option="chart1.option" :loading="chart1.loading"/>
      </div>
      <div class="echarts">
        <IEcharts :option="chart2.option" :loading="chart2.loading"/>
      </div>
    </div>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/lite.js';
  import {createPie,createBar} from '@/service/chartSev';
  import httpRequest from '@/service/httpRequest';
  import apiList from '@/service/apiList';
  import { Toast } from 'vant';

  import 'echarts/lib/chart/bar';
  import 'echarts/lib/chart/pie';

  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/tooltip';

  export default {
    name: 'Chart1',
    components:{
      IEcharts
    },
    data () {
      return {
        chart1:{
          loading:true,
          option:{}
        },
        chart2:{
          loading:true,
          option:{}
        }
      }
    },
    created(){
      let _this = this;
      httpRequest(apiList.hostdashboard,'get',{flag:0}).then(function(res){
        if(res.status==200){
          _this.chart1.option = createPie(res.data,{
            colors:[
              "#169ef4",
              "#ffc20a"
            ],
            title:"机房"
          })
        }else{
          Toast.fail(res.msg)
        }
        _this.chart1.loading=false;
      },function(err){
        _this.chart1.loading=false;
        Toast.fail(err);
      }).then(function(){
        httpRequest(apiList.hostdashboard,'get',{flag:1}).then(function(res){
          if(res.status==200){
            _this.chart2.option = createBar(res.data,{
              colors:['#169ef4', '#ffc20a', '#169ef4'],
              title:"区域"
            })
          }else{
            Toast.fail(res.msg)
          }
          _this.chart2.loading=false;
        },function(err){
          _this.chart2.loading=false;
          Toast.fail(err);
        })
      });


    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index";


</style>
