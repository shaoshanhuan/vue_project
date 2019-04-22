<template>
    <div  style="padding:10px;">
        <Card>
            <h1>大日历</h1>
            <input type="text" v-model="year">
            <input type="text" v-model="month">
            <table class="table1">
                <tr v-for="i in 6">
                    <td v-for="j in 7" :class="{'gray':dateArr[(i - 1) * 7 + (j - 1)].gray}">
                        {{dateArr[(i - 1) * 7 + (j - 1)].date}}日

                        {{
                            solar2lunar(year, dateArr[(i - 1) * 7 + (j - 1)].month, dateArr[(i - 1) * 7 + (j - 1)].date).term 
                            ||
                            solar2lunar(year, dateArr[(i - 1) * 7 + (j - 1)].month, dateArr[(i - 1) * 7 + (j - 1)].date).dayCn 
                        }}
 

                        <img v-show="checkBanXiu(dateArr[(i - 1) * 7 + (j - 1)].timestamp) == '班'" class="jiaobiao" src="/images/ban.png" />
                        <img v-show="checkBanXiu(dateArr[(i - 1) * 7 + (j - 1)].timestamp) == '休'" class="jiaobiao" src="/images/xiu.png" />
                    </td>
                </tr>
            </table>
        </Card>
    </div>
</template>

<script>
import solarLunar from 'solarlunar';
export default {
    data(){
        return {
            year: 2019,
            month: 4,
            dateArr : [],
            specialDay : [
                {"timestamp":1546185600000,"thing":"休"},
                {"timestamp":1546272000000,"thing":"休"},
                {"timestamp":1549209600000,"thing":"休"},
                {"timestamp":1549296000000,"thing":"休"},
                {"timestamp":1549382400000,"thing":"休"},
                {"timestamp":1549468800000,"thing":"休"},
                {"timestamp":1549555200000,"thing":"休"},
                {"timestamp":1549641600000,"thing":"休"},
                {"timestamp":1549728000000,"thing":"休"},
                {"timestamp":1554393600000,"thing":"休"},
                {"timestamp":1554480000000,"thing":"休"},
                {"timestamp":1554566400000,"thing":"休"},
                {"timestamp":1556380800000,"thing":"班"},
                {"timestamp":1556640000000,"thing":"休"},
                {"timestamp":1556726400000,"thing":"休"},
                {"timestamp":1556812800000,"thing":"休"},
                {"timestamp":1556899200000,"thing":"休"},
                {"timestamp":1559836800000,"thing":"休"},
                {"timestamp":1559923200000,"thing":"休"},
                {"timestamp":1560009600000,"thing":"休"},
                {"timestamp":1568304000000,"thing":"休"},
                {"timestamp":1568390400000,"thing":"休"},
                {"timestamp":1568476800000,"thing":"休"},
                {"timestamp":1569859200000,"thing":"休"},
                {"timestamp":1569945600000,"thing":"休"},
                {"timestamp":1570032000000,"thing":"休"},
                {"timestamp":1570118400000,"thing":"休"},
                {"timestamp":1570204800000,"thing":"休"},
                {"timestamp":1570291200000,"thing":"休"},
                {"timestamp":1570377600000,"thing":"休"}
            ]
        }
    },
    created(){
        this.calc();
    },
    methods: {
        solar2lunar(y, m, d){
            return solarLunar.solar2lunar(y, m, d);
        },
        checkBanXiu(timestamp){
            for(let i = 0 ; i < this.specialDay.length ; i++){
                if(this.specialDay[i].timestamp == timestamp){
                    return this.specialDay[i].thing;
                }
            }
        },
        calc(){
            // 清空数组
            this.dateArr = [];
            // 计算三要素
            // 人类的年份和月份
            const year = this.year;
            const month = this.month;
            // 罗列三要素
            // ① 本月1号星期几
            const thisMonthFirstDayDay = new Date(year, month - 1, 1).getDay() || 7;
            // ② 本月有几天
            const thisMonthDateAmount = new Date(year, month, 0).getDate();
            // ③ 上月有几天
            const prevMonthDateAmount = new Date(year, month - 1, 0).getDate();
        
            // 本月1号星期几，就往数组中塞入几个上个月的尾巴。
            for(let i = 0 ; i < thisMonthFirstDayDay ; i++){
                this.dateArr.unshift({
                    "gray" : true,
                    "date" : prevMonthDateAmount - i,
                    "month" : month - 1, //人类的月份，不过可能出现0月
                    "timestamp" : Date.parse(new Date(year, month - 2, prevMonthDateAmount - i))
                });   
            }
            // 塞入本月的
            for(let i = 1 ; i <= thisMonthDateAmount ; i++){
                this.dateArr.push({
                    "gray" : false,
                    "date" : i,
                    "month" : month,
                    "timestamp" : Date.parse(new Date(year, month - 1, i))
                });
            }
            
            var _i = 0;
            // 塞入下个月的，凑够42天
            while(this.dateArr.length < 42){
                _i ++;
                this.dateArr.push({
                    "gray" : true,
                    "date" : _i,
                    "month" : month + 1, //人类的月份，不过可能出现13月
                    "timestamp" : Date.parse(new Date(year, month , _i))
                });
            }
        }
    },
    watch : {
        year(){
            this.calc();
        },
        month(){
            this.calc();
        }
    }
};
</script>

<style lang="less" scoped>
    .table1{
        border-collapse: collapse;
        width:100%;
        tr,td{
            border-collapse: collapse;
        }
        td{
            // 强制让td为表格的宽度的七分之一
            width:14.28%;
            height:80px;
            border:1px solid rgb(214, 208, 208);
            position: relative;

            &.gray{
                background:#eee;
            }

            .jiaobiao{
                position:absolute;
                right:0;
                top:0;
            }
        }
    }
</style>