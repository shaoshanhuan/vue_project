import Vue from 'vue';
import router from '../router.js';
export default {
    namespaced: true,
    state: {
        username: '',
        nickname: '',
        avatar: ''
    },
    mutations: {
        changeUsername(state, { username }) {
            state.username = username;
        },
        changeNickname(state, { nickname }) {
            state.nickname = nickname;
        },
        changeAvatar(state, { avatar }) {
            state.avatar = avatar;
        }
    },
    actions: {
        async checkMe({ commit }) {
            const resultObj = await Vue.prototype.$http.get('/me').then(data => data.data);
            // console.log(resultObj);
            // 没有登陆
            if (resultObj.err == -4) {
                router.push({ 'name': 'login' });
                return;
            }
            // 解构
            const { nickname, username, avatar } = resultObj;
            // 上跳
            commit('changeNickname', { nickname });
            commit('changeUsername', { username });
            commit('changeAvatar', { avatar });
        }
    }
};