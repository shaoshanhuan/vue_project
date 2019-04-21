<template>
    <div>
        <router-view></router-view>

        <!-- 这里要罗列所有的全局性质的modal框、抽屉 -->
        <change-avatar-modals />
        <change-profile />
    </div>
</template>

<script>
import changeAvatarModals from './components/change-avatar-modals/change-avatar-modals.vue';
import changeProfile from './components/change-profile/change-profile.vue';
export default {
    components : {
        changeAvatarModals,
        changeProfile
    }
};
</script>