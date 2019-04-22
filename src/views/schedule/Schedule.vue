<template>
    <div style="padding:10px;">
        <Card>
            <div class="wrap_box">
                <div class="leftBar">
                    <SideBar />
                </div>
                <BigCanlendar />
            </div>
        </Card>
    </div>
</template>

<script>
import BigCanlendar from './BigCanlendar.vue';
import SideBar from './SideBar.vue';
export default {
    components:{
        BigCanlendar,
        SideBar
    }
};
</script>

<style lang="less" scoped>
    .wrap_box{
        padding-left:300px;
        min-width:1100px;
 
        .leftBar{
            position: absolute;
            top:0;
            left:0;
            width:300px;
            padding:10px;
        }
    }
</style>