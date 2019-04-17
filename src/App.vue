<template>
    <div>
        <h1>======我是公共的部分======</h1>
        <router-view></router-view>
        <h1>======我是公共的部分======</h1>
    </div>
</template>

<script>
export default {
    
};
</script>

<style lang="less" scoped>
    h1{
        color:red;
    }
</style>