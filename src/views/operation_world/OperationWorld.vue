<template>
    <div>
        <div class="table_box">
            <div class="righttool">
                <Button type="primary" shape="circle" icon="ios-settings" @click="isShowSettingColsModal = true"></Button>
            </div>

            <!-- 弹出层 -->
            <Modal
                v-model="isShowSettingColsModal"
                title="请更改您的列的顺序"
                width="600"
                @on-ok="okhandler()"
            >
                <SettingColsModal ref="scm" v-if="isShowSettingColsModal"/>
            </Modal>
            <!-- 弹出层 -->

            <div class="clfix"></div>
            <!-- 表格 -->
            <!-- 列定义要的是函数的返回结果 -->
            <Table 
                :columns="getColConfigByMyColsFromAllCols()" 
                :data="result"
            ></Table>
            <div class="sp" ref="sp">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>
        </div>
            

        <div class="h10"></div>
        <Page 
            :total="total" 
            show-sizer 
            :current="page" 
            :page-size="pagesize"
            @on-change="changePage"
        />
    </div>
</template>

<script>
// 引入组件
import SettingColsModal from './SettingColsModal.vue';
// 引入仓库
import allcols from './allcols.js';

var o = null;
export default {
    data(){
        var self = this;
        return {
            // 是否显示弹出层
            isShowSettingColsModal : false,
            // 列配置
            cols: []
        }
    },
    components: {
        SettingColsModal
    },
    // 生命周期
    created(){
        // 拉取默认数据
        this.$store.dispatch('car/loadServer');
        // 探究本地存储中有没有cols字段，如果没有设置一个默认的。
        if(localStorage.getItem('cols') == null){
            // 设置一个默认的
            localStorage.setItem('cols', JSON.stringify(['avatar', 'brand', 'series', 'color', 'buydate']))
        }
    },
    computed: {
        total(){
            return this.$store.state.car.total;
        },
        page(){
            return this.$store.state.car.page;
        },
        pagesize(){
            return this.$store.state.car.pagesize;
        },
        result(){
            return this.$store.state.car.result;
        }
    },
    // 函数
    methods: {
        changePage(page){
            this.$store.dispatch('car/changePage', {page});
        },
        // 从仓库中根据自己的cols数组得到真正的列定义
        getColConfigByMyColsFromAllCols(){
            // 本地存储器中读cols
            // 此时一定有cols，如果没有刚刚created生命周期已经早早地给设默认了
            var cols = JSON.parse(localStorage.getItem('cols'));
            
            return cols.map(item => allcols[item]);
        },
        // 确定按钮
        okhandler(){
            // 读取儿子的数组顺序
            var already_show_cols = this.$refs.scm.already_show_cols;
            // 写入本地存储
            localStorage.setItem('cols', JSON.stringify(already_show_cols));
            // 调用自己的函数
            this.getColConfigByMyColsFromAllCols();
        }
    },
    updated(){
        // 回调函数，具体机理看老师视频
        if(this.result != o){
            this.$refs.sp.style.display = "none";
        }
        
        o = this.result;
    },
    watch : {
        page(){
            // 显示loading图片，这里直接用dom了，因为怕用state产生死循环
            this.$refs.sp.style.display = "block";
        }
    }
};
</script>

<style lang="less" scoped>
    .h10{
        height:10px;
    }
    .table_box{
        position:relative;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .righttool{
        float:right;
    }
    .clfix{
        clear:both;
    }
     
</style>