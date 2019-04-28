<template>
    <div>
       <DatePicker 
            type="daterange" 
            split-panels 
            style="width: 280px"
            :value="value"
            @on-change="changeHandler"
            :clearable="false"
       ></DatePicker>
    </div>
</template>

<script>
export default {
    props: ['k'],
    computed: {
        value(){
            var results =  this.$store.state.car.filters.filter(item => item.k == this.k);
            if(results.length != 0){
                return results[0].v.split("to").map(item => new Date(Number(item)));
            }
            return [];
        }
    },
    methods: {
        changeHandler(v){
            this.$store.dispatch('car/changeFilter',{"k":this.k,'v':Date.parse(v[0]) + "to" + Date.parse(v[1])});
        }
    }
};
</script>

<style lang="less" scoped>

</style>