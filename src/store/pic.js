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
        },
        changenowidx(state, {idx}){
            state.nowidx = idx;
        }
    },
    actions: {
        async loadData({commit}, {id}){
            const info = await Vue.prototype.$http.get('/car/' + id).then(data=>data.data);
            commit('changeInfo', {info});
        }
    }
};