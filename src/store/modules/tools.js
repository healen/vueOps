import httpRequest from '@/service/httpRequest';
import apiList from '@/service/apiList';
export default {
  state : {
    actionShow:false,//是否显示action组件
  },
  mutations : {
    toolClickAction(state,id){
      state.actionShow=!state.actionShow
    },
    toolCancelAction(state){
      state.actionShow = false;
    }

  },
  actions : {
    toolClickAction(context,id){
      context.commit('toolClickAction',id)
    },
    toolCancelAction(context){
      context.commit('toolCancelAction')
    }
  },
  getters :{},
}