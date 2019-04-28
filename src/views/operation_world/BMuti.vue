<template>
    <div>
        <CheckboxGroup :value="value" @on-change="changeHandler">
            <Checkbox v-for="item in options" :key="item" :label="item"></Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
export default {
    props: ['k', 'options'],
    computed: {
        value(){
            var results =  this.$store.state.car.filters.filter(item => item.k == this.k);
            if(results.length != 0){
                return results[0].v.split("v");
            }
            return [];
        }
    },
    methods: {
        changeHandler(v){
            this.$store.dispatch('car/changeFilter',{"k":this.k,'v':v.join('v')});
        }
    }
};
</script>

<style lang="less" scoped>

</style>