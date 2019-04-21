<template>
    <div>
        <img style="border-radius:50%" :width="130" v-if="avatar != ''" :src="'http://127.0.0.1:3000/' + avatar" />
        <Button @click="updateAvatarBtnHandler">修改头像</Button>
    </div>
</template>

<script>
export default {
    created(){
        
    },
    methods: {
        updateAvatarBtnHandler(){
            this.$changeAvatarModel.show();
        }
    },
    computed: {
        nickname(){
            return this.$store.state.me.nickname;
        },
        avatar(){
            return this.$store.state.me.avatar;
        }
    }
};
</script>

<style lang="ess" scoped>

</style>