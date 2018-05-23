<template>
    <ul v-if="treeData" class="ztree-content" :value="value">

        <li v-for="(it, i) in treeData" class="item" :style="{paddingLeft:it.level*15 + 'px'}" :pid="it.pid" v-show="it.show">
            <transition name="fade">
            <div :class="{curItem:it.checked}" class="item">
                <button v-if="it.hasChilds" class="btn" @click.stop="iconClick(it, i)">
                    {{it.childShow ? '-' : '+'}}
                </button>
                <div class="left">
                    <van-checkbox v-model="it.checked" @change="changeItemChecked(it)">{{ it.name }}</van-checkbox>
                </div>
            </div>
            </transition>
        </li>
    </ul>
</template>

<script>
    import httpRequest from '@/service/httpRequest';
    import apiList from '@/service/apiList';
    import  constant  from '@/constant.js'
    import { Toast } from 'vant';

    export default {
        name: 'ztree',
        props:[ 'value', 'initShow'],
        data(){
            let t = this;
            const toast = Toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '加载中...'
              });
            httpRequest(apiList.tree, 'get', {offset:0, limit:1000, is_enabled:1}, constant.BASE_URL ).then((res)=>{
                toast.clear();
                let data = [res.data];
                t.changeData(data);
                t.initStatus();
                if(t.$props.value){
                    t.$props.value.split(',').map((item)=>{
                        t.selectItem(item);
                    });
                }
            });
            return {
                treeData:[]
            }
        },
        methods:{
            changeData(data, pid=-1, plevel=0){
                data.map((item)=>{
                    item.pid = pid;
                    item.checked = false;
                    item.childShow = true;
                    item.hasChilds = false;
                    item.level = plevel;
                    item.show = true;
                    if(item.pid !== -1){
                        item.show = this.initShow;
                        item.childShow = this.initShow;
                    }else{
                        item.childShow = this.initShow;
                    }
                    let childs = item.childs;
                    delete item.childs;
                    this.treeData.push(item);
                    if(childs && childs.length){
                        item.hasChilds = true;
                        this.changeData(childs, item.id, plevel+1);
                    }
                })
            },
            initStatus(){
              let t = this;
              this.treeData.map((item)=>{
                if(item.pid == 0){
                    t.iconClick(item);
                }
              })
            },
            selectItem(itemId){
                let allSel = [];
                this.treeData.map((it)=>{
                    if(parseInt(it.id) == parseInt(itemId)){
                        it.checked = true;
                    }
                    if(it.checked)allSel.push(it.id);
                });
                this.$emit('input', allSel.join(','));
            },
            changeItemChecked(item){
                let t = this;
                let allSel = [];
                t.treeData.map((it)=>{
                    if(it.checked)allSel.push(it.id);
                });
                t.$emit('input', allSel.join(','));
            },
            iconClick(item){
                let t = this;
                item.childShow = !item.childShow ;
                if(!item.show){
                    item.childShow = false;
                }
                t.treeData.map((it, i)=>{
                    if(it.pid == item.id){
                        it.show = item.childShow;
                        if(it.hasChilds && !it.show){
                            t.iconClick(it);
                        }
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped="">
    .ztree-content{
        /*border-left: 1px dotted #eee;*/
        li{
            line-height:4rem;
            padding-left: 1rem;
            .item{
                display: -webkit-box;
                display: box;
                border-bottom:1px solid #efefef;
                -webkit-box-align: center;
                .left{
                    -webkit-box-flex: 1;
                    //padding-left: .5rem;
                }

            }
            .curItem{
                color: #3388ff;
            }
            .btn{
                border-radius: 3px;
                display: block;
                width: 2.2rem;
                height: 2.2rem;
                border:none;
                line-height: 2rem;
                background: #3388ff;
                color: #ffffff;
                font-size: 1.8rem;
                margin-right: .5rem;
                margin-left: .5rem;
            }
        }
    }
</style>