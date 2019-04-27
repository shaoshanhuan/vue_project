<template>
    <div>
        <Table :columns="col" :data="$store.state.car.result"></Table>
    </div>
</template>

<script>
export default {
    data(){
        var self = this;
        return {
            col: [
                {
                    title: '形象照',
                    key: 'avatar',
                    render(h, {row}){
                        return h('div', {
                            on: {
                                click(){
                                    self.$router.push({
                                        'name': 'pic',
                                        'params': {
                                            'id': row.id
                                        }
                                    })
                                }
                            }
                        }, [
                            h('img', {
                                attrs: {
                                    src: `http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`
                                }
                            })
                        ]);
                    }
                },
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '品牌',
                    key: 'brand'
                },
                {
                    title: '颜色',
                    key: 'color'
                },
                {
                    title: '售价',
                    key: 'price'
                }
            ]
        }
    },
    created(){
        this.$store.dispatch('car/loadServer');
    }
};
</script>

<style lang="less" scoped>

</style>