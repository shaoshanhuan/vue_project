import Vue from 'vue';
export default {
    namespaced: true,
    state : {
        info : {
            username: '',
            nickname: '',
            idcard: '',
            avatar:'',
            sex:'',
            age:'',
            signature:'',
            qq:'',
            weixin:'',
            mobile:''
        }
    },
    mutations : {
        changeInfo(state, {_info}){
            state.info = Object.assign(state.info, _info);
        }
    },
    actions: {
        // 拉取某人数据
        async loadSomeOneProfile({commit}, {username}){
            const resultObj = await Vue.prototype.$http.get('/profile/' + username).then(data => data.data);
             
            if(resultObj.result == 1){
                commit('changeInfo', {_info : resultObj});
            }
        }
    }
};