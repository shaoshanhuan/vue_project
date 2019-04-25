<template>
    <div>
        <h1>{{id}}汽车的图集</h1>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id : 0
        }
    },
    created(){
        this.id = this.$route.params.id;
    }
};
</script>

<style lang="less" scoped>

</style>