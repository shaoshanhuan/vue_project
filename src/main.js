import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import App from './App.vue';
import routes from './routes.js';

// Vue-Cli自带的配置，不用管
Vue.config.productionTip = false;

// 使用路由插件
Vue.use(VueRouter);
// 使用UI插件
Vue.use(iView);

// 路由的实例化
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
});

// 实例化Vue
new Vue({
    render: h => h(App),
    // 路由
    router
}).$mount('#app');
