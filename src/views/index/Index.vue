<template>
    <div>
        <Content style="padding:20px;">   
            <Card>
                <Button v-for="i in 100" :key="i" @click="kanche(i)">
                    看id为{{1000000 + i}}这个车
                </Button>
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
        },
        kanche(i){
            this.$router.push('/pic/' + (1000000 + i));
        }
    }
};
</script>

<style lang="less" scoped>
    h1{
        color:red;
    }
</style>