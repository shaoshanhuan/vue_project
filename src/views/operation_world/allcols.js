import moment from 'moment';

export default {
    avatar : {
        title: '形象照',
        key: 'avatar',
        render(h, {row}){
            return h('div', {
                on: {
                    click(){
                        self.$router.push({
                            'name': 'pic',
                            'params': {
                                'id': row.id
                            }
                        })
                    }
                }
            }, [
                h('ShowLoadingImage', {
                    props: {
                        src: `http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`,
                        width: '120px'
                    }
                })
            ]);
        }
    },
    id: {
        title: 'id',
        key: 'id'
    },
    brand: {
        title: '品牌',
        key: 'brand'
    },
    color: {
        title: '颜色',
        key: 'color'
    },
    price: {
        title: '售价',
        key: 'price'
    },
    series: {
        title: '车系',
        key:'series'
    },
    km: {
        title: '公里数',
        key:'km',
        render(h,{row}){
            return h('span', row.km / 10000);
        }
    },
    engine : {
        title: '发动机',
        key:'engine',
    },
    buydate: {
        title: '购买日期',
        key:'buydate',
        render(h,{row}){
            return h('span', moment(row.buydate).format('YYYY-MM-DD'));
        }
    },
    license: {
        title: '是否有拍照',
        key:'license',
        render(h,{row}){
            return h('span', row.license ? '有牌' : '没牌');
        }
    },
    exhaust: {
        title: '排放标准',
        key:'exhaust',
    },
    gearbox: {
        title: '变速箱',
        key:'gearbox',
    },
    fuel: {
        title: '燃料',
        key: 'fuel'
    }
};
   