<template>
    <div>
        <!-- 筛选器 -->
        <Row>
            <Col :span="3">
                排放标准：
            </Col>
            <Col :span="21">
                <BMuti k="exhaust" :options="['国一','国二','国三','国四','国五']"/>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
                颜色：
            </Col>
            <Col :span="21">
                <BMuti k="color" :options="['红','黄','橙','灰','银','银灰','香槟','咖啡','黑','白']"/>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
                变速箱：
            </Col>
            <Col :span="21">
                <BMuti k="gearbox" :options="['手动','自动','手自一体']"/>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
                燃料：
            </Col>
            <Col :span="21">
                <BMuti k="fuel" :options="['汽油','柴油','纯电动','油电混合']"/>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
                购买日期：
            </Col>
            <Col :span="21">
                <BDate k="buydate" />
            </Col>
        </Row>

        <div class="lefttool">
            <RadioGroup v-model="view" type="button">
                <Radio label="grid">网格视图</Radio>
                <Radio label="table">表格视图</Radio>
            </RadioGroup>
        </div>
        <div class="righttool">
            <Button type="primary" shape="circle" icon="ios-settings" @click="isShowSettingColsModal = true"></Button>
        </div>
        
        <div class="clfix"></div>
        <!-- 表格 -->
        <div class="table_box" >
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

            <!-- 表格 -->
            <!-- 列定义要的是函数的返回结果 -->
            <Table 
                :columns="getColConfigByMyColsFromAllCols()" 
                :data="result"
                v-if="view == 'table'"
            ></Table>
            <div class="sp" ref="sp">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>
        </div>
        
        <GridView v-if="view == 'grid'" :data="result"/>
            

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
// 引入类型
import BMuti from './BMuti.vue';
import BDate from './BDate.vue';
import GridView from './GridView.vue';

var o = null;
export default {
    data(){
        var self = this;
        return {
            // 是否显示弹出层
            isShowSettingColsModal : false,
            // 列配置
            cols: [],
            // 当前视图形式
            view: 'grid'
        }
    },
    components: {
        SettingColsModal,
        BMuti,
        BDate,
        GridView
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
    .ivu-row{
        height: 30px;
    }
</style>