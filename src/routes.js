import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';

// 向外暴露路由表
export default [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];