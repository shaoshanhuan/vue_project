<template>
    <div>
        <h1>我是首页</h1>
        <p>{{$store.state.me.nickname}}你好，一天要喝8杯水哦！</p>
    </div>
</template>

<script>
export default {
    created(){
    }
};
</script>

<style lang="less" scoped>
    h1{
        color:red;
    }
</style>