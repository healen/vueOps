<template>
  <div class="tools">
    <div class="fixed">
      <van-nav-bar title="常用工具" right-text="按钮" @click-right="onClickRight">
        <van-icon name="search" slot="right" />
      </van-nav-bar>
      <transition name="bounce">
        <van-search v-if="$store.state.list.showSearch" v-model="$store.state.list.res.name" placeholder="工具名称" show-action @search="onSearch" @blur="onSearch">
          <div slot="action" class="search" @click="onSearch">搜索</div>
        </van-search>
      </transition>
    </div>
    <div class="contant" :class="{'search':$store.state.list.showSearch}">
      <van-list v-model="$store.state.list.loading" :finished="$store.state.list.finished" @load="onLoad" :offset="1"  :immediateCheck="false">
        <div v-if="$store.state.list.res.list.length==0" class="empty">
          ～没有数据～
        </div>


        <div v-for="(item, i) in $store.state.list.res.list" :key="item.id">
          <div class="listitem">
            <div class="text" >{{item.name}}</div>
            <div class="icons-list">
              <van-icon name="play"  @click="onClickAction(item.id)"/>
              <van-icon v-if="!item.moreShow" name="more-o" @click="onMoreShow({index:i, show:true})"/>
              <van-icon v-if="item.moreShow" name="more"  @click="onMoreShow({index:i, show:false})"/>
            </div>
          </div>
          <transition name="fade">
            <div class="infomsg" v-if="item.moreShow">
              <div class="text" >创建人：{{item.created_by||'暂无'}}</div>
              <div class="text" >最后修改人：{{item.updated_by||'暂无'}}</div>
              <div class="text" >创建时间：{{item.create_time||'暂无'}}</div>
              <div class="text" >修改时间：{{item.update_time||'暂无'}}</div>
            </div>
          </transition>
        </div>



      </van-list>
    </div>
    <van-actionsheet v-model="$store.state.tools.actionShow" title="执行参数" >
      <div>
        <van-cell-group>
          <van-field label="参数1" icon="clear" placeholder="输入参数1"></van-field>
          <van-field type="text" label="参数2" placeholder="输入参数1"></van-field>
        </van-cell-group>
        <van-col span="24">
          <van-col span="12">
            <van-button  style="background: #fdfdfd;color: #666" bottom-action @click="onCancelAction">
              取消
            </van-button>
          </van-col>
          <van-col span="12">
            <van-button span="12" type="primary" bottom-action>
              执行
            </van-button>
          </van-col>
        </van-col>
      </div>
    </van-actionsheet>

  </div>
</template>
<script>
  export default {
    name: 'Tools',
    methods:{
      onClickRight(){
        this.$store.dispatch('listClickRight');//展开收起
      },
      onSearch(){
        this.$store.dispatch('listSearch');
      },
      onLoad() {
        this.$store.dispatch('listLoad');
      },
      onClickAction(id){
        this.$store.dispatch('toolClickAction',id);//展开Action
      },
      onCancelAction(){
        this.$store.dispatch('toolCancelAction');//收起Action
      },
      onMoreShow(playload){
        this.$store.dispatch('moreShow',playload)
      }
    },
    mounted(){
      const {offset,limit} = this.$store.state.list.res;
      this.$store.dispatch('listFatch',{query:{offset, limit}});
    },
  }
</script>
<style lang="less" scoped>
  @import "index.less";
</style>
