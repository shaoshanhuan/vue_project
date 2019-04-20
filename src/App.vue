<template>
    <div>
        <router-view></router-view>

        <changeAvatarModals />
    </div>
</template>

<script>
import changeAvatarModals from './components/change-avatar-modals/change-avatar-modals.vue';
export default {
    components : {
        changeAvatarModals
    }
};
</script>