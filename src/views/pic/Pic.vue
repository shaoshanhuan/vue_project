<template>
    <div class="pic_wrap">
        
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
        }
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
    }
};
</script>

<style lang="less" scoped>
    .pic_wrap{
        position:absolute;
        width:100%;
        height:100%;
        background:black;
        top:0;
        left:0;
        
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