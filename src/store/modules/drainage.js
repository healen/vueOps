import httpRequest from "../../service/httpRequest";
import apiList from "../../service/apiList";

export default {
  state : {
    actionShow:false,//是否显示action组件
    treeShow:false,
    pickerShow:false,
    pickerTitle:'',
    pickerValueSet:[],
    logShow: false,
    logInfo:'',
  },
  mutations : {
    drainageResetAction(state){
      state.logShow = false;
      state.logInfo = '';
      state.treeShow = false;
      state.actionShow = false;
      state.pickerShow = false;
    },
    drainageClickAction(state,id){
      state.actionShow=!state.actionShow
    },
    drainageCancelAction(state){
      state.actionShow = false;
    },
    drainageTreeShowAction(state, show){
      state.treeShow = show;
    },
    drainagePickerAction(state, payload){
      state.pickerShow = true;
      state.pickerTitle = `选择${payload.paramNameZh}`;
      let tmp = Object.assign(payload.valueSet);
      tmp.map((item)=>{
        item.text = item.text || item.name;
      });
      state.pickerValueSet = tmp;
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
  },
  actions : {
    drainageClickAction(context,id){
      context.commit('drainageClickAction',id)
    },
    drainageCancelAction(context){
      context.commit('drainageCancelAction')
    },
    drainageTreeShowAction(context, show){
      context.commit('drainageTreeShowAction', show);
    },
    drainagePickerAction(context, payload){
      context.commit('drainagePickerAction', payload);
    },
    drainageLogShowAction(context, show){
      context.commit('drainageLogShowAction', show);
    },
    drainageLogInfoAction(context, payload){
      context.commit('drainageLogInfoAction', payload);
    },
    drainageResetAction(context){
      context.commit('drainageResetAction');
    }
  },
  getters :{},
}