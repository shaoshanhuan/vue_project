<template>
    <div class="pic_wrap">
        <div style="position:relative;height:100%;">
            <div class="big_img_box" v-if="info != null">
                <img class="myimg" ref="myimg" :src="`http://127.0.0.1:3000/images/carimages_small/${picPathname}`"/>
                <img ref="loading"  class="loading" src="/images/loading.svg" />
            </div>
        </div>
        <div class="rightpart">
            <CarInfo />
            <ChooseAlbum />
            <SmallPicNav :id="id"/>
        </div>
    </div>
</template>

<script>
import CarInfo from './CarInfo.vue';
import ChooseAlbum from './ChooseAlbum.vue';
import SmallPicNav from './SmallPicNav.vue';
export default {
    data(){
        return {
            id : 0 
        };
    },
    created(){
        this.id = this.$route.params.id;
        // 让store拉取数据
        this.$store.dispatch('pic/loadData', {'id': this.$route.params.id});
    },
    components: {
        CarInfo,
        ChooseAlbum,
        SmallPicNav
    },
    updated(){
        if(!this.picPathname) return;

        this.$refs.loading.style.display = 'block';
        // 加载大图
        var img = new Image();
        img.src = `http://127.0.0.1:3000/images/carimages/${this.picPathname}`;
        var self = this;
        img.onload = function(){
            self.$refs.myimg.src = img.src;
            self.$refs.loading.style.display = 'none';
             
        };
    },
    methods:{
        
    },
    computed: {
        info(){
            return this.$store.state.pic.info;
        },
        picPathname(){
            if(this.$store.state.pic.info != null){
                return `${this.id}/${this.nowalbum}/${this.nowalbumimages[this.nowidx]}`;
            }
            return '';
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
    }
};
</script>

<style lang="less" scoped>
    .pic_wrap{
        position:absolute;
        width:100%;
        height:100%;
        min-height:600px;
        background:black;
        top:0;
        left:0;
        padding-right:320px;
        box-sizing:border-box;

        .big_img_box{
            text-align: center;
            padding-top:20px;
            color:white;
            .myimg{
                position:absolute;
                width:90%;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
            }
            .loading{
                position:absolute;
                width:30px;
                height:30px;
                top:50%;
                left:calc((100% - 320px) / 2);
                margin-top:-15px;
                margin-left:-15px;
            }
        }
        
        .rightpart{
            position:absolute;
            width:300px;
            height:100%;
            top:0;
            right:0;
            box-sizing:content-box;
            padding:10px;
        }
    }
</style>