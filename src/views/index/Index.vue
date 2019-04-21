<template>
    <div>
        <Content style="padding:20px;">   
            <Card>
                <Button @click="showModel">按我显示弹出层</Button>
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