import Vue from 'vue';
import querystring from 'querystring';
export default {
    namespaced: true,
    state : {
        page: 1,
        pagesize: 10,
        total: 0,
        result: [],
        filters: [
            
        ]
    },
    mutations : {
        changePage(state, {page}){
            state.page = page;
        },
        changePagesize(state, {pagesize}){
            state.pagesize = pagesize;
        },
        changeResult(state, {result}){
            state.result = result;
        },
        changeTotal(state, {total}){
            state.total = total;
        },
        addFilter(state, {k, v}){
            state.filters.push({k, v});
        },
        removeFilter(state, {k}){
            state.filters = state.filters.filter(item => item.k != k);
        },
        updateFilter(state, {k, v}){
            state.filters = state.filters.map(item => item.k == k ? {...item, v} : item);
        }
    },
    actions: {
        async loadServer({commit, state}){
            // 得到查询对象。这个查询对象的初始值是page、pagesize在里面，
            // 然后遍历filters数组补项
            var queryobj = state.filters.reduce((a, b) => {
                return {
                    ...a,
                    [b.k] : b.v
                };
            }, {
                page: state.page,
                pagesize: state.pagesize
            });

            // 发出请求
            const {result, total} = await Vue.prototype.$http.get('/cars?' + querystring.stringify(queryobj)).then(data => data.data);
            commit('changeResult', {result});
            commit('changeTotal', {total});
        },
        changePage({commit, dispatch}, {page}){
            commit('changePage', {page});
            dispatch('loadServer');
        },
        changePagesize({commit, dispatch}, {pagesize}){
            commit('changePage', {page : 1});
            commit('changePagesize', {pagesize});
            dispatch('loadServer');
        },
        changeFilter({commit, dispatch, state}, {k, v}){
            // 在这里决定到底要增、删、改。
            // 看当前数组中有没有这个k
            for(var i = 0; i < state.filters.length; i++){
                if(state.filters[i].k == k){
                    break;
                }
            }
            // 现在通过判断循环变量i，在出了循环之后的值，可以判断循环是自然终止的，还是人工阻止的
            if(i == state.filters.length){
                // 自然终止的循环，说明数组中没有这个k，应该增加
                commit('addFilter', {k, v}); 
            }else{
                // 人工break出来的循环，说明数组中有这个k，应该继续判断v是不是空
                if(v == ""){
                    // 应该删除
                    commit('removeFilter', {k}); 
                }else{
                    // 应该更改
                    commit('updateFilter', {k, v});
                }
            }

            commit('changePage', {page : 1});
            dispatch('loadServer');
        }
    }
};