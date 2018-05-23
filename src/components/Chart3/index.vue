<template>
  <div class="drainage">
    <div class="fixed">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="业务服务占比" left-text="返回"/>
    </div>
    <div class="indexcontent">
      <div class="indexcontent">
        <div class="echarts">
          <IEcharts :option="chart1.option" :loading="chart1.loading"/>
        </div>
        <div class="echarts">
          <IEcharts :option="chart2.option" :loading="chart2.loading"/>
        </div>

        <div class="echarts">
          <IEcharts :option="chart3.option" :loading="chart3.loading"/>
        </div>
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

  import 'echarts/lib/chart/pie';
  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/tooltip';


  export default {
    name: 'Chart3',
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
        },
        chart3:{
          loading:true,
          option:{}
        },
      }
    },
    created(){
      let _this = this;
      httpRequest(apiList.hostdashboard,'get',{flag:4}).then(function(res){
        if(res.status==200){
          _this.chart1.option = createPie(res.data.data,
            {
              colors:["#169ef4","#ffc20a"],
              title:res.data.title
            }
          )
        }else{
          Toast.fail(res.message)
        }
        _this.chart1.loading=false;
      },function(err){
        _this.chart1.loading=false;
        Toast.fail(err);
      }).then(function(){
        httpRequest(apiList.hostdashboard,'get',{flag:5}).then(function(res){
          if(res.status==200){
            _this.chart2.option = createPie(res.data.data,
              {
                colors:["#169ef4","#ffc20a"],
                title:res.data.title
              }
            )
          }else{
            Toast.fail(res.message)
          }
          _this.chart2.loading=false;
        },function(err){
          _this.chart2.loading=false;
          Toast.fail(err);
        })
      }).then(function(){

        httpRequest(apiList.hostdashboard,'get',{flag:6}).then(function(res){
          if(res.status==200){
            _this.chart3.option = createPie(res.data.data,
              {
                colors:["#169ef4","#ffc20a"],
                title:res.data.title
              }
            )
          }else{
            Toast.fail(res.message)
          }
          _this.chart3.loading=false;
        },function(err){
          _this.chart3.loading=false;
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
