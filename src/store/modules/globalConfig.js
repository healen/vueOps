export default {
  state : {
    listApi:'job/list/'
  },
  mutations : {
    setListApi(state,url){
      state.currentUrl=url
    }
  },
  actions : {
    setListApi(context,url){
      context.commit('setListApi',url);
    }
  },
  getters :{},
}