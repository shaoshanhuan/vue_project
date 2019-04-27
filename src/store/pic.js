import Vue from 'vue';
export default {
    namespaced: true,
    state : {
        info : null,
        nowalbum: 'view',
        nowidx : 0
    },
    mutations : {
        changeInfo(state, {info}){
            state.info = info;
        },
        changenowalbum(state, {album}){
            state.nowalbum = album;
            state.nowidx = 0;
        },
        changenowidx(state, {idx}){
            state.nowidx = idx;
        }
    },
    actions: {
        async loadData({commit}, {id}){
            commit('changeInfo', {info: null});
            const info = await Vue.prototype.$http.get('/car/' + id).then(data=>data.data);
            commit('changeInfo', {info});
            commit('changenowalbum', {'album': 'view'});
            commit('changenowidx', {'idx': 0});
        }
    }
};