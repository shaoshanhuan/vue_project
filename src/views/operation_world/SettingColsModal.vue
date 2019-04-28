<template>
    <div>
        <h3>已经有的列（请您拖拽）</h3>
        <div class="r_row">
            <draggable v-model="already_show_cols" :animation="150" group="xpy">
                <p v-for="item in already_show_cols" :key="item">
                    {{item}}
                </p>
            </draggable>
        </div>
        <h3>没有的列（请您拖拽）</h3>
        <div class="r_row">
            <draggable v-model="not_show_cols" :animation="150" group="xpy">
                <p v-for="item in not_show_cols" :key="item">
                    {{item}}
                </p>
            </draggable>
        </div>
    </div>
</template>

<script>
import allcols from './allcols.js';
 import draggable from 'vuedraggable';

export default {
    data(){
        return {
            already_show_cols: [],
            not_show_cols : []
        }
    },
    created(){
        // 读取所有正在显示的列，从本地存储器中读
        var already_show_cols = JSON.parse(localStorage.getItem('cols'));
        // 这是所有的列的名字：
        var all_cols = Object.keys(allcols);
        // 没有被显示的列
        var not_show_cols = all_cols.filter(item => !already_show_cols.includes(item));

        // 设置data，因为只有设置data，才能让template看见
        this.already_show_cols = already_show_cols;
        this.not_show_cols = not_show_cols;
    },
    components: {
        draggable,
    }
};
</script>

<style lang="less" scoped>
    .r_row{
       overflow:hidden; 
    }
    .r_row p{
        float:left;
        padding:3px 6px;
        border:1px solid #333;
        border-radius: 4px;
        margin-right:10px;
        margin-bottom:4px;
    }
</style>