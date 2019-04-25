<template>
    <div v-if="info != null">
        <h1>
            {{info.brand}}{{info.series}}
        </h1>
        <h3>
            {{info.color}}色{{info.price}}万元{{info.km | yiwan}}公里{{info.engine}}{{info.buydate | riqi('YYYY年MM月')}}
        </h3>
    </div>
</template>

<script>
export default {
    computed: {
        info(){
            return this.$store.state.pic.info;
        }
    }
};
</script>

<style lang="less" scoped>
    h1{
        color:white;    
        margin-bottom:10px;
    }
    h3{
        color:white;
        font-size:16px;
        margin-bottom:10px;
    }
</style>