import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';

import App from './App.vue';
import router from './router.js';
import http from './utils/http.js';
import store from './store/index.js';
import changeAvatarModalControl from './bus/changeAvatarModalControl.js';
import changeProfileControl from './bus/changeProfileControl.js';
import yiwan_filter from './filters/yiwan.js';
import riqi_filter from './filters/riqi.js';
import ShowLoadingImage from './components/show-loading-image/show-loading-image.vue';

// Vue-Cli自带的配置，不用管
Vue.config.productionTip = false;

// 使用路由插件
Vue.use(VueRouter);
// 使用UI插件
Vue.use(iView);
// 使用头像管理插件MODAL框（自己编写的）
Vue.use(changeAvatarModalControl);
// 使用用户资料管理插件抽屉（自己编写的）
Vue.use(changeProfileControl);
// 使用全局性质的图片loading小组件
Vue.component('ShowLoadingImage',ShowLoadingImage);

// 定义过滤器
Vue.use(yiwan_filter);
Vue.use(riqi_filter);

// 将http对象写在Vue的原型上
Vue.prototype.$http = http;


// 实例化Vue
new Vue({
    render: h => h(App),
    // 路由
    router,
    store
}).$mount('#app');
