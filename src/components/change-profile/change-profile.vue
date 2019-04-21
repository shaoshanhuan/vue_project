<template>
    <div>
        <Drawer 
            title="修改您的个人资料" 
            :value="$changeProfileDrawer.isShow"
            @on-close="closeHandler"
            :width="600"
        >
            <Profile v-if="$changeProfileDrawer.isShow"/>
        </Drawer>
    </div>
</template>

<script>
import Profile from './Profile.vue';
export default {
    methods: {
        closeHandler() {
            this.$changeProfileDrawer.hide();
        }
    },
    components: {
        Profile
    }
};
</script>

<style lang="less" scoped>

</style>