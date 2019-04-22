import VueRouter from 'vue-router';
import IndexLayout from './layouts/IndexLayout.vue';
import Login from './views/login/Login.vue';
// import Index from './views/index/Index.vue';
import store from './store/index.js';
import Canlendar from './views/canlendar/MyCanlendar.vue';

// 路由的实例化
const router = new VueRouter({
    routes: [
        { 
            path: '/index', 
            component: IndexLayout, 
            children : [
                {
                    path: 'index',
                    // component: Index,
                    // 临时改一下首页其实是大日历
                    component: Canlendar,
                    name: 'index'
                }
            ]
        },
        { 
            path: '/login', 
            component: Login, 
            name: 'login' 
        },
        {
            path: '*',
            redirect : {
                name : 'index'
            }
        }
    ]
});

// 守卫
router.beforeEach((to, from, next) => {
    // 如果用户要去的地方不是login，那么就要命令store进行身份检查
    if (to.name != 'login') {
        // store的身份检查有store/me.js中的actions中的checkMe函数完成
        store.dispatch('me/checkMe');
    }
    next();
});

// 向外暴露路由实例
export default router;