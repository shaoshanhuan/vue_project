<template>
    <div style="height:400px;">
        <Row v-for="i in 3">
            <Col :span="6" v-for="j in 4"  v-if="(i - 1) * 4 + (j - 1) < data.length">
                <div style="height:110px;">
                    <ShowLoadingImage :src="`http://127.0.0.1:3000/images/carimages_small/${data[(i - 1) * 4 + (j - 1)].id}/view/${data[(i - 1) * 4 + (j - 1)].avatar}`"/>
                </div>
               
                <div>
                    品牌：{{data[(i - 1) * 4 + (j - 1)].brand}}
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['data']
};
</script>

<style lang="less" scoped>

</style>