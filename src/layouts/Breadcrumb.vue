<template>
    <div>
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem :to="{'name':'index'}">
                首页
            </BreadcrumbItem>
            <BreadcrumbItem :to="{'name':$store.state.routerStore.column}">
                {{$store.state.routerStore.columnChinese}}
            </BreadcrumbItem>
            <BreadcrumbItem>
                {{$store.state.routerStore.subcolumnChinese}}
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
export default {
    
};
</script>

<style lang="less" scoped>

</style>