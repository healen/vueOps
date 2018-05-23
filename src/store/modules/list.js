import httpRequest from '@/service/httpRequest';
import apiList from '@/service/apiList';
import { Toast } from 'vant';
import Vue from 'vue';
export default {
  state : {
    showSearch:false,//显示搜索bool
    loading:true,//列表loading bool
    finished:false,//列表加载完成 bool
    /*
    *真正数据
    * */
    res:{
      name:"",//匹配名称
      offset:0,//从
      limit:20,//到
      next:'',//下一页接口
      count:0,//总条数
      list:[]// 列表
    }
  },
  mutations : {
    listClickRight(state){
      state.showSearch=!state.showSearch
    },
    listFatch(state,playload){
      state.loading=true;
      httpRequest(
        playload.api?playload.api : apiList.jobList,
        'get',
        playload.query
      ).then(function(data){
        state.res.list = data.data;
        state.res.count = data.count;
        state.res.next= data.next;
        state.loading=false;
        state.finished = false;
        state.showSearch=false;
      },function(e){
        state.loading=false;
        console.log(e);
      })
    },
    listLoad(state){
      const {res} = state;
      //res.list = [];
      state.loading=true;
      if (res.list.length >= res.count) {
        state.finished = true;
        state.loading=false;
      }else{
        setTimeout(()=>{
          if(res.next!=''){
            httpRequest(res.next,'get').then(function(result){
              let newArr = result.results;
              let objList = res.list;
              res.next= result.next;
              res.list = objList.concat(newArr);
              state.loading=false;
              if (res.list.length >= res.count) {
                state.finished = true;
              }else{
                state.finished = false;

              }
            },function(e){
              console.log(e);
            });
          }
        },500);
      }
    },
    listSearch(state,api){
      let {name,offset,limit} = state.res;
      offset=0;limit=20;name=name.trim();

      httpRequest(
        api?api:apiList.jobList,
        'get',
        {
          offset,
          limit,
          name
        }
      ).then(function(data){
        state.res.list = data.data;
        state.res.count = data.count;
        state.res.next= data.next;
        state.loading=false;
        state.finished = false;
        state.showSearch=false;
      },function(e){
        Toast.fail(e);
      })

    },

    moreShow(state,playload){
      const {res} = state;
      Vue.set(res.list[playload.index],'moreShow',playload.show)
    }

  },
  actions : {
    listClickRight(context){
      context.commit('listClickRight')
    },
    listFatch(context,playload){
      context.commit('listFatch',playload)
    },
    listLoad(context){
      context.commit('listLoad')
    },
    listSearch(context,api){
      context.commit('listSearch',api)
    },
    moreShow(context, payload){
        context.commit('moreShow', payload);
    }
  },
  getters :{},
}