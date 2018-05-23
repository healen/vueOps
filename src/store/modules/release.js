export default {
  state : {
    actionShow:false,//是否显示action组件
    treeShow:false,
    logShow: false,
    logInfo:'',
    pickerShow:false,
    pickerTitle:'',
    pickerValueSet:[]
  },
  mutations : {
    releaseResetAction(state){
      state.logShow = false;
      state.logInfo = '';
      state.treeShow = false;
      state.actionShow = false;
      state.pickerShow = false;
    },
    releaseClickAction(state,id){
      state.actionShow=!state.actionShow
    },
    releaseCancelAction(state){
      state.actionShow = false;
    },
    releaseTreeShowAction(state, show){
      state.treeShow = show;
    },
    releaseLogShowAction(state, show){
      if(show){
        state.logInfo = '';
      }
      state.logShow = show;
    },
    releaseLogInfoAction(state, payload){
      let steps = payload.command_steps;
      let textArea = '';
      steps && steps.map((item)=>{
        textArea += `-----------${item.name}---------\n` ;
        let  lines = item["command_lines"];
        let  success_count = 0;
        let  fail_count = 0;
        lines && lines.map((item$1)=>{
          success_count = item$1['success_count'];
          fail_count = item$1['fail_count'];
          textArea += item$1.result_message;
          textArea += '\n***********************\n';
        });
        textArea += `成功：${success_count} 台    失败：${fail_count}台\n`;
        textArea += `-------------------------\n`;
      });
      state.logInfo = textArea;
    },
    releasePickerAction(state, payload){
      state.pickerShow = true;
      state.pickerTitle = `选择${payload.paramNameZh}`;
      let tmp = Object.assign(payload.valueSet);
      tmp.map((item)=>{
        item.text = item.text || item.name;
      });
      state.pickerValueSet = tmp;
    }
  },
  actions : {
    releaseClickAction(context,id){
      context.commit('releaseClickAction',id)
    },
    releaseCancelAction(context){
      context.commit('releaseCancelAction')
    },
    releaseTreeShowAction(context, show){
        context.commit('releaseTreeShowAction', show);
    },
    releaseLogShowAction(context, show){
      context.commit('releaseLogShowAction', show);
    },
    releasePickerAction(context, payload){
     context.commit('releasePickerAction', payload);
    },
    releaseLogInfoAction(context, payload){
      context.commit('releaseLogInfoAction', payload);
    },
    releaseResetAction(context){
      context.commit('releaseResetAction');
    }
  },
  getters :{},
}