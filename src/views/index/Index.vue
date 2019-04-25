<template>
    <div>
        <Content style="padding:20px;">   
            <Card>
                我是首页
            </Card>
        </Content>
    </div>
</template>

<script>
export default {
    created(){
    },
    methods:{
        showModel(){
            this.$changeProfileDrawer.show();
        }
    }
};
</script>

<style lang="less" scoped>
    h1{
        color:red;
    }
</style>