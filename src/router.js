import VueRouter from 'vue-router';
import Login from './views/login/Login.vue';
import Index from './views/index/Index.vue';
import store from './store/index.js';

// 路由的实例化
const router = new VueRouter({
    routes : [
        { path: '/', component: Index },
        { path: '/login', component: Login, name:'login' }
    ]
});

// 守卫
router.beforeEach((to, from, next) => {
    // 如果用户要去的地方不是login，那么就要命令store进行身份检查
    if(to.name != 'login'){
        // store的身份检查有store/me.js中的actions中的checkMe函数完成
        store.dispatch('me/checkMe');
    }
    next();
});

// 向外暴露路由实例
export default router;