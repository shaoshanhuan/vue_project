<template>
    <div>
        <div class="table_box">
            <Table 
                :columns="col" 
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
var o = null;
export default {
    data(){
        var self = this;
        return {
            isShowloading : true,
            col: [
                {
                    title: '形象照',
                    key: 'avatar',
                    render(h, {row}){
                        return h('div', {
                            on: {
                                click(){
                                    self.$router.push({
                                        'name': 'pic',
                                        'params': {
                                            'id': row.id
                                        }
                                    })
                                }
                            }
                        }, [
                            h('ShowLoadingImage', {
                                props: {
                                    src: `http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`,
                                    width: '120px'
                                }
                            })
                        ]);
                    }
                },
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '品牌',
                    key: 'brand'
                },
                {
                    title: '颜色',
                    key: 'color'
                },
                {
                    title: '售价',
                    key: 'price'
                }
            ]
        }
    },
    created(){
        this.$store.dispatch('car/loadServer');
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
    methods: {
        changePage(page){
            this.$store.dispatch('car/changePage', {page});
        }
    },
    updated(){
        // 显示loading图片，这里直接用dom了，因为怕用state产生死循环
        this.$refs.sp.style.display = "block";
        // 回调函数，具体机理看老师视频
        if(this.result != o){
            this.$refs.sp.style.display = "none";
        }
        
        o = this.result;
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
     
</style>