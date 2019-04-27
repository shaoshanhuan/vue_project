<template>
    <div class="smallpicnav_wrap" v-if="info != null">
        <div class="unit" :style="{'left': -320 * page + 'px'}">
            <ul v-for="i in totalPage" :key="i">
                <li 
                    v-for="j in 4" 
                    :key="j"
                    v-show="shu(i,j) < totalCount" 
                    :class="{'cur':shu(i,j) == nowidx}"
                    @click="changeNowidx(shu(i,j))"
                >
                    <img 
                        :src="`http://127.0.0.1:3000/images/carimages_small/${id}/${nowalbum}/${nowalbumimages[shu(i,j)]}`"
                    />
                </li>
            </ul>
        </div>
        <div class="page">
            <div v-for="i in totalPage" :key="i" :class="{'cur':page == (i - 1)}" @mouseenter="changePage(i - 1)"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return {
            page : 0
        };
    },
    methods: {
        changePage(page) {
            this.page = page;
        },
        shu(i, j){
            return (i - 1) * 4 + (j - 1);
        },
        changeNowidx(idx){
            this.$store.commit('pic/changenowidx', {idx});
        }
    },
    computed:{
        info(){
            return this.$store.state.pic.info;
        },
        totalPage(){
            if(this.$store.state.pic.info != null){
                return Math.ceil(this.totalCount / 4);
            }
            return 0;
        },
        totalCount(){
            if(this.$store.state.pic.info != null){
                return this.nowalbumimages.length;
            }
            return 0;
        },
        nowalbum(){
            return this.$store.state.pic.nowalbum;
        },
        nowalbumimages(){
            if(this.$store.state.pic.info != null){
                return this.$store.state.pic.info.images[this.nowalbum];
            }
            return [];
        },
        nowidx(){
            return this.$store.state.pic.nowidx;
        }
    },
    watch : {
        nowidx(v){
            this.page = parseInt(v / 4);
        },
        nowalbum(){
            this.page = parseInt(this.page / 4);
        }
    }
};
</script>

<style lang="less" scoped>
    .smallpicnav_wrap{
        width:300px;
        padding-top:20px;
        overflow:hidden;
    
        .unit{
            width:44444px;
            overflow:hidden;
            position: relative;
            transition:all 0.5s ease 0s;
            ul{
                width: 300px;
                float: left;
                margin-right:20px;
                overflow: hidden;
                list-style:none;

                li{
                    width:145px;
                    float:left;
                    margin-bottom:10px;
                    position: relative;

                    &:nth-child(2n + 1){
                        margin-right:10px;
                    }

                    img{
                        width:100%;
                    }

                    &::before{
                        content:"";
                        position:absolute;
                        top:0;
                        left:0;
                        width:100%;
                        height:100%;
                        background:rgba(0,0,0,.7);
                        transition:all 0.5s ease 0s;
                    }
                    &.cur::before{
                        background:rgba(0,0,0,0);
                    }
                }
            }
        }
        .page{
            height:10px;
            display:flex;
            div{
                flex:1;
                box-sizing: border-box;
                background:#eee;
                border-right:10px solid black;

                &.cur{
                    background:#04774b;
                }

                &:last-child{
                    border-right:none;
                }
            }
        }
    }
       
</style>