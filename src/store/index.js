import Vue from 'vue';
import Vuex from 'vuex';

import me from './me.js';

// 使用可预测状态容器
Vue.use(Vuex);

// 注意，这和我们之前Vue基础教学写法不一样，那时候是在main中实例化
// 现在在这里实例化，目的是在router.js文件中可以直接使用它了
export default new Vuex.Store({
    modules : {
        me
    }
});