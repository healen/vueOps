<template>
  <div class="tools">
    <div class="fixed">
      <van-nav-bar title="发版" />
    </div>

    <div class="contant" :class="{'search':$store.state.list.showSearch}">
      <van-list v-model="$store.state.list.loading" :finished="$store.state.list.finished" @load="onLoad" :offset="1"  :immediateCheck="false">
        <div v-if="$store.state.list.res.list.length==0" v-show="$store.state.list.loading==false" class="empty">
          ～没有数据～
        </div>
        <div v-for="(item, i) in $store.state.list.res.list" :key="item.id">
          <div class="listitem">
            <div class="text" >{{item.name}}</div>
            <div class="icons-list">
              <van-icon name="play"  @click="onClickAction(item, item.id)"/>
              <van-icon v-if="!item.moreShow" name="more-o" @click="onMoreShow({index:i, show:true})"/>
              <van-icon v-if="item.moreShow" name="more"  @click="onMoreShow({index:i, show:false})"/>
            </div>
          </div>
          <transition name="fade">
            <div class="infomsg" v-if="item.moreShow">
              <div class="text" >当前版本：{{item.current_version||'暂无'}}</div>
              <div class="text" >工具名称：{{item.tool_set_name||'暂无'}}</div>
              <div class="text" >创建人：{{item.created_by||'暂无'}}</div>
              <div class="text" >最后修改人：{{item.updated_by||'暂无'}}</div>
              <div class="text" >创建时间：{{item.create_time||'暂无'}}</div>
              <div class="text" >修改时间：{{item.update_time||'暂无'}}</div>
            </div>
          </transition>
        </div>
      </van-list>
    </div>

    <van-actionsheet v-model="$store.state.release.actionShow" title="发版参数" >
      <div>

        <div class="select_server">
          <span @click="onTreeShow(true)">
            <van-icon name="server"/> 选择机器
          </span>
        </div>

        <van-col span="24" v-for="(param,i) in current.tool_info.param" :key="i" class="border-b">
          <van-col span="24" v-if="param.type === 'text'">
            <van-field :label="param.paramNameZh"  :placeholder="param.desc" v-model="param.value"></van-field>
          </van-col>
          <van-col span="20" v-if="param.type === 'select' || param.type === 'version'">
            <van-field :label="param.paramNameZh"  :placeholder="param.desc||'输入参数'" v-model="param.value"></van-field>
          </van-col>
          <van-col span="4" class="t_right" v-if="param.type === 'select' || param.type === 'version' ">


            <div class="icongr" @click="onPickerAction(param, i)">
              <van-icon name="arrow"/>
            </div>

          </van-col>
        </van-col>

        <van-col span="24">
          <van-col span="12">
            <van-button  style="background: #fdfdfd;color: #666" bottom-action @click="onCancelAction">
              取消
            </van-button>
          </van-col>
          <van-col span="12">
            <van-button span="12" type="primary" bottom-action @click="onSubmit">
              发版
            </van-button>
          </van-col>
        </van-col>
      </div>
    </van-actionsheet>

    <van-actionsheet style="height:90%;" v-model="$store.state.release.treeShow" title="选择机器" >
      <ztree v-model="treeItem" v-if="$store.state.release.treeShow" :initShow="1"></ztree>
    </van-actionsheet>
    <van-actionsheet  v-model="$store.state.release.pickerShow" :title="$store.state.release.pickerTitle" >
      <van-picker show-toolbar :columns="$store.state.release.pickerValueSet"  @confirm="onPickerConfirm" @cancel="onPickerCancel"/>
    </van-actionsheet>
    <van-actionsheet class="log-win" v-model="$store.state.release.logShow" v-if="$store.state.release.logShow" title="日志">
      <pre>{{ $store.state.release.logInfo }}</pre>
    </van-actionsheet>
  </div>
</template>
<script>
  import apiList from '@/service/apiList';
  import Ztree from "../Common/ztree";
  import httpRequest from '@/service/httpRequest';
  import { Toast } from 'vant';
  export default {
    name: 'Tools',
      components: {Ztree},
      created(){
        this.$store.dispatch('releaseResetAction');
      },
      data(){
        return {
            treeItem:'',
            curParamIndex:0,
            current:{
                tool_info:{
                    param:[]
                }
            }
        }
      },
      methods:{
      onLoad() {
        this.$store.dispatch('listLoad');
      },
      onTreeShow(show){
        this.$store.dispatch('releaseTreeShowAction', show);
      },
      onLogShow(obj){
        this.$store.dispatch('releaseLogShowAction', true);
        this.getLog(obj);
      },
      getLog(obj){
        let t = this;
        let timeout = setTimeout(()=>{
          httpRequest(apiList.deployLog, 'get', {jobId:obj.job_id}).then((res)=>{
            t.$store.dispatch('releaseLogInfoAction', res.data);
            clearTimeout(timeout);
            if(res.data.status == 1 && t.$store.state.release.logShow)//继续
            {
              t.getLog(obj);
            }
          });
        }, 3000);
      } ,
      onClickAction(item, id){
        this.current = item;
        this.treeItem = '';
        this.$store.dispatch('releaseClickAction',id);//展开Action
      },
      onCancelAction(){
        this.$store.dispatch('releaseCancelAction');//收起Action
      },
      onMoreShow(playload){
        this.$store.dispatch('moreShow',playload)
      },
      onPickerAction(payload, curParamIndex){
        this.curParamIndex = curParamIndex;
        if(payload.type === 'version' && payload.valueSet.length === 0){
            payload.valueSet = this.current.version_list;
            payload.valueSet.map((item)=>{
                item.text = item.version;
            })
        }
        this.$store.dispatch('releasePickerAction', payload);
      },
      onPickerConfirm(value, index){
        this.current.tool_info.param[this.curParamIndex].value = value.version || value.name;
        this.$store.state.release.pickerShow = false;
      },
      onPickerCancel(){
          this.$store.state.release.pickerShow = false;
      },
      onSubmit(){
        if(!this.treeItem){
          return Toast.fail('请选择机器');
        }
        let formData = {
            target_group_ids: this.treeItem,
        };
          let command_set_id = this.current.command_set_id;
          let commandLineId = this.current.command_line_id;
          let  reqData = {"command_set_id":command_set_id,'deploy_id':this.current.id,'commandLineId':commandLineId};
          let parameter = "";
          this.current.tool_info.param.map(function(pitme){
              if(pitme.value){
                  parameter += pitme.paramNameZh+"="+pitme.value+";";
              }
              if(pitme.paramNameZh == "version"){
                  reqData['version'] = pitme.value
              }
          });
          parameter = parameter.substring(0,parameter.length-1);


          let name = this.current.name;
          let tool_info = this.current.tool_info;
          if( command_set_id > 0){
              let deploy_info = {
                  "command_set_id":command_set_id,
                  "new_flow":1,
                  "paras":{
                      1:{
                          "target_type":1,
                          "target_group_ids":formData.target_group_ids,
                          "target_host_list":'',
                          "go_live":3
                      }
                  }
              };
              deploy_info['paras'][1][commandLineId] = {
                  "parameter":parameter,
                  "is_skip":0
              }
              reqData['deploy_info'] = JSON.stringify(deploy_info);
          }else{
              let command_info = {
                  "name":name+" 发版",
                  "type":2,
                  "comment":"用于 "+name+" 发版",
                  "steps":[
                      {
                          "name":name+"发版步骤1",
                          "seq_no":1,
                          "type":0,
                          "target_group_ids":formData.target_group_ids,
                          "target_host_list":'',
                          "target_type":1,
                          "go_live":3,
                          "lines":[
                              {
                                  "sub_seq_no":1,
                                  "type":1,
                                  "source_file_name":tool_info.command,
                                  "default_script_parameter":parameter,
                                  "tool_set_type":5
                              }
                          ]
                      }
                  ]
              };
              reqData['command_info'] = JSON.stringify(command_info);
          }

          reqData.csrfmiddlewaretoken = this.getCookie('csrftoken');

          let t = this;
          httpRequest(apiList.deployOp, 'post', reqData).then(function(res){
              if(res.status == 200)
              {
                t.onLogShow(res);
              }else{
                Toast.fail(res && res.msg);
              }
          })
      },
      getCookie(key){
        let index = document.cookie.indexOf(key);
        let rest = document.cookie.substr(index + key.length + 1);
        let lindex = rest.indexOf(';');
        return lindex >0 ? rest.substr(0, lindex): rest;
      }
    },
    mounted(){
      const {offset,limit} = this.$store.state.list.res;
      this.$store.dispatch('listFatch',{query:{offset, limit},api:apiList.deploytool});
    }
  }
</script>
<style lang="less" scoped>
  @import "index.less";
</style>
