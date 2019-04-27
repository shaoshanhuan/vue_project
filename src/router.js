import VueRouter from 'vue-router';

import store from './store/index.js';

import IndexLayout from './layouts/IndexLayout.vue';
import CourtLayout from './layouts/CourtLayout.vue';
import MatchLayout from './layouts/MatchLayout.vue';

import Login from './views/login/Login.vue';
import Index from './views/index/Index.vue';
import Schedule from './views/schedule/Schedule.vue';
import OverviewOfGolfCourse from './views/overview_of_golf_course/OverviewOfGolfCourse.vue';
import OperationWorld from './views/operation_world/OperationWorld.vue';
import StadiumArea from './views/stadium_area/StadiumArea.vue';
import OverviewOfEvents from './views/overview_of_events/OverviewOfEvents.vue';
import TourMath from './views/tour_match/TourMath.vue';
import PointRace from './views/point_race/PointRace.vue';
import ApplyForACompetition from './views/apply_for_a_competition/ApplyForACompetition.vue';
import Pic from './views/pic/Pic.vue';

// 路由的实例化
const router = new VueRouter({
    routes: [
        { 
            path: '/index', 
            component: IndexLayout, 
            children : [
                {
                    path: 'index',
                    component: Index,
                    name: 'index',
                    meta: {
                        chinese: '首页'
                    }
                },
                {
                    path: 'court',
                    component: CourtLayout,
                    name: 'court',
                    meta: {
                        chinese: '球场'
                    },
                    // 跳转到默认的栏目的第一个子栏目
                    redirect: {
                        name: 'overviewofgolfcourse'
                    },
                    children : [
                        {
                            path: 'overviewofgolfcourse',
                            component: OverviewOfGolfCourse,
                            name: 'overviewofgolfcourse',
                            meta: {
                                chinese: '球场概览',
                                parentCol: 'court',
                                parentChinese: '球场'
                            },
                        },
                        {
                            path: 'operationworld',
                            component: OperationWorld,
                            name: 'operationworld',
                            meta: {
                                chinese: '运营天地',
                                parentCol: 'court',
                                parentChinese: '球场'
                            },
                        },
                        {
                            path: 'stadiumarea',
                            component: StadiumArea,
                            name: 'stadiumarea',
                            meta: {
                                chinese: '球场专区',
                                parentCol: 'court',
                                parentChinese: '球场'
                            }
                        }
                    ]
                },
                {
                    path: 'match',
                    component: MatchLayout,
                    name: 'match',
                    meta: {
                        chinese: '比赛'
                    },
                    // 跳转到默认的栏目的第一个子栏目
                    redirect: {
                        name: 'overviewofevents'
                    },
                    children : [
                        {
                            path: 'overviewofevents',
                            component: OverviewOfEvents,
                            name: 'overviewofevents',
                            meta: {
                                chinese: '赛事概览',
                                parentCol: 'match',
                                parentChinese: '比赛'
                            }
                        },
                        {
                            path: 'tourmath',
                            component: TourMath,
                            name: 'tourmath',
                            meta: {
                                chinese: '巡回赛',
                                parentCol: 'match',
                                parentChinese: '比赛'
                            }
                        },
                        {
                            path: 'pointrace',
                            component: PointRace,
                            name: 'pointrace',
                            meta: {
                                chinese: '积分赛',
                                parentCol: 'match',
                                parentChinese: '比赛'
                            }
                        },
                        {
                            path: 'applyforacompetition',
                            component: ApplyForACompetition,
                            name: 'applyforacompetition',
                            meta: {
                                chinese: '申请举办赛事',
                                parentCol: 'match',
                                parentChinese: '比赛'
                            }
                        }
                    ]
                },
                {
                    path: 'schedule',
                    component: Schedule,
                    name: 'schedule',
                    meta: {
                        chinese: '日程'
                    }
                }
            ]
        },
        { 
            path: '/login', 
            component: Login, 
            name: 'login' 
        },
        {
            path: '/pic/:id',
            component: Pic,
            name: 'pic'
        },
        {
            path: '*',
            redirect : {
                name : 'index'
            }
        }
    ]
});

// 前置守卫，用来验证权限
router.beforeEach((to, from, next) => {
    // 如果用户要去的地方不是login，那么就要命令store进行身份检查
    if (to.name != 'login') {
        // store的身份检查有store/me.js中的actions中的checkMe函数完成
        store.dispatch('me/checkMe');
    }
    next();
});

// 后置守卫，用来写routerStore
router.afterEach((to) => {
    store.commit('routerStore/changeRouter', 
        {
            column: to.meta.parentCol,
            columnChinese : to.meta.parentChinese,
            subcolumn : to.name,
            subcolumnChinese : to.meta.chinese
        }
    );
});

// 向外暴露路由实例
export default router;