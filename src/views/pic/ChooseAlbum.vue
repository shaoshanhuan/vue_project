<template>
    <div v-if="info != null">
        <ul>
            <li :class="{'cur':nowalbum=='view'}" @click="changeNowAlbum('view')">外观（{{info.images.view.length}}）</li>
            <li :class="{'cur':nowalbum=='inner'}" @click="changeNowAlbum('inner')">内饰（{{info.images.inner.length}}）</li>
            <li :class="{'cur':nowalbum=='engine'}" @click="changeNowAlbum('engine')">结构和发动机（{{info.images.engine.length}}）</li>
            <li :class="{'cur':nowalbum=='more'}" @click="changeNowAlbum('more')">更多细节（{{info.images.more.length}}）</li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        info(){
            return this.$store.state.pic.info;
        },
        nowalbum(){
            return this.$store.state.pic.nowalbum;
        }
    },
    methods: {
        changeNowAlbum(album){
            this.$store.commit('pic/changenowalbum',{album});
        }
    }
};
</script>

<style lang="less" scoped>
    ul{
        list-style:none;
        overflow:hidden;

        li{
            float:left;
            width:145px;
            height:40px;
            background:#eee;
            margin-bottom:10px;
            line-height: 40px;
            text-align: center;
            font-size:16px;
            cursor: pointer;

            &:nth-child(2n + 1){
                margin-right:10px;
            }
            &.cur{
                background:rgb(4, 119, 75);
                color:white;
            }
        }
    }
</style>