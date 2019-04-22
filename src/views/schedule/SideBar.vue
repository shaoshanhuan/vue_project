<template>
    <div>
        <p>
            <Button shape="circle" icon="md-arrow-dropleft" @click="$store.commit('schedule/goPrevMonth')"></Button>
            <span class="sss">
                {{year}}年
                {{month}}月
            </span>
            <Button shape="circle" icon="md-arrow-dropright"  @click="$store.commit('schedule/goNextMonth')"></Button>
        </p>
        <p>
            
        </p>
        <p>
            sadf
        </p>
        <p>
            sadf
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        year(){
            return this.$store.state.schedule.year;
        },
        month(){
            return this.$store.state.schedule.month;
        }
    }
};
</script>

<style lang="less" scoped>
    .sss{
        font-size:30px;
        font-weight: bold;
    }
</style>