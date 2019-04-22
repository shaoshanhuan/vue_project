export default {
    namespaced: true,
    state: {
        // 当前正在显示的年、月（人类月）
        year: new Date().getFullYear(),
        month : new Date().getMonth() + 1,
        schedules : [
            {
                'start': 1554652800000,
                'duration' : 33,
                'title' : '暴雨',
                'type': 'COMPETITION'
            },
            {
                'start': 1554912000000,
                'duration' : 1,
                'title': '411大会',
                'type': 'COMPETITION'
            },
            {
                'start' : 1554739200000,
                'duration': 3,
                'title': '翠湖山庄球场春季公开赛',
                'type': 'COMPETITION'
            },
            {
                'start' : 1554825600000,
                'duration' : 1,
                'title': '高尔夫联盟聚餐',
                'type': 'BUSSUNESS'
            },
            {
                'start': 1555862400000,
                'duration' : 3,
                'title': '老婆生孩子',
                'type': 'COMPETITION'
            },
            {
                'start': 1555948800000,
                'duration': 2,
                'title': '国安队比赛',
                'type': 'COMPETITION'
            }
        ],
        specialDay : [
            {'timestamp':1546185600000, 'thing':'休'},
            {'timestamp':1546272000000, 'thing':'休'},
            {'timestamp':1549209600000, 'thing':'休'},
            {'timestamp':1549296000000, 'thing':'休'},
            {'timestamp':1549382400000, 'thing':'休'},
            {'timestamp':1549468800000, 'thing':'休'},
            {'timestamp':1549555200000, 'thing':'休'},
            {'timestamp':1549641600000, 'thing':'休'},
            {'timestamp':1549728000000, 'thing':'休'},
            {'timestamp':1554393600000, 'thing':'休'},
            {'timestamp':1554480000000, 'thing':'休'},
            {'timestamp':1554566400000, 'thing':'休'},
            {'timestamp':1556380800000, 'thing':'班'},
            {'timestamp':1556640000000, 'thing':'休'},
            {'timestamp':1556726400000, 'thing':'休'},
            {'timestamp':1556812800000, 'thing':'休'},
            {'timestamp':1556899200000, 'thing':'休'},
            {'timestamp':1559836800000, 'thing':'休'},
            {'timestamp':1559923200000, 'thing':'休'},
            {'timestamp':1560009600000, 'thing':'休'},
            {'timestamp':1568304000000, 'thing':'休'},
            {'timestamp':1568390400000, 'thing':'休'},
            {'timestamp':1568476800000, 'thing':'休'},
            {'timestamp':1569859200000, 'thing':'休'},
            {'timestamp':1569945600000, 'thing':'休'},
            {'timestamp':1570032000000, 'thing':'休'},
            {'timestamp':1570118400000, 'thing':'休'},
            {'timestamp':1570204800000, 'thing':'休'},
            {'timestamp':1570291200000, 'thing':'休'},
            {'timestamp':1570377600000, 'thing':'休'}
        ]
    },
    mutations: {
        goNextMonth(state){
            if(state.month < 12){
                state.month ++;
            }else{
                state.month = 1;
                state.year ++;
            }
        },
        goPrevMonth(state){
            if(state.month > 1){
                state.month --;
            }else{
                state.month = 12;
                state.year --;
            }
        }
    },
    actions: {
         
    }
};