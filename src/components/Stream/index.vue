<template>
  <div class="drainage">
    <div class="fixed">
      <van-nav-bar
              left-arrow @click-left="onClickLeft"
              right-text="去引流" @click-right="golink('drainage')"
              title="流量"
              left-text="返回"/>
    </div>
    <div class="indexcontent">
      <div class="swipbox">

        <div v-if="loading" class="loadingbox">
          加载中{{dians}}
        </div>


        <van-swipe :autoplay="10000" v-if="!loading">
          <van-swipe-item v-for="(pie,index) in options" :key="index">
            <div class="swpa">
              <p class="title">{{pie.brand}}</p>
              <div class="chartbox">

                <div class="othermsg">

                  <div class="warps">

                    <van-row>
                      <van-col span="12" class="titlec">值</van-col>
                      <van-col span="12" class="titlec">占比</van-col>
                    </van-row>
                    <template v-for="item in pie.channel.series[0].data">

                      <van-row>
                        <van-col span="12">{{item.value}}</van-col>
                        <van-col span="12">{{((item.value/pie.channel.total)*100).toFixed(1)}}%</van-col>
                      </van-row>
                    </template>

                  </div>





                </div>
                <IEcharts :option="pie.channel"  class="chart"/>
              </div>
              <div class="chartbox">

                <div class="othermsg">



                  <div class="warps">

                    <van-row>
                      <van-col span="12" class="titlec">值</van-col>
                      <van-col span="12" class="titlec">占比</van-col>
                    </van-row>
                    <template v-for="item in pie.env.series[0].data">

                      <van-row>
                        <van-col span="12">{{item.value}}</van-col>
                        <van-col span="12">{{((item.value/pie.channel.total)*100).toFixed(1)}}%</van-col>
                      </van-row>
                    </template>

                  </div>

                </div>

                <IEcharts :option="pie.env"  class="chart chart1"/>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="streambox">
        <van-button type="danger" @click="golink('drainage')" >去引流</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import IEcharts from 'vue-echarts-v3/src/lite.js';
  import {createPieBasic} from '@/service/chartSev';
  import httpRequest from '@/service/httpRequest';
  import apiList from '@/service/apiList';
  import { Toast } from 'vant';
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
        options:[],
        loading:true,
        dian:[]
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
    },
    created(){
      let _this = this;
      let i=0;

      httpRequest(apiList.dashboard,'get',{}).then(function(data){
        if(data.status==200){
          let httpres=[];

          httpres=data.data;

          for(let i=0;i<httpres.length;i++){
            httpres[i].channel=createPieBasic(httpres[i].channel,{title:''});
            httpres[i].env=createPieBasic(httpres[i].env,{title:''});
          }
          _this.options=httpres;

        }else{
          Toast.fail(data.msg);
        }
        _this.loading=false

      },function(err){
        Toast.fail(err);
      });
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1);
      },
      golink(link){
        this.$router.push(link);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index";
</style>
