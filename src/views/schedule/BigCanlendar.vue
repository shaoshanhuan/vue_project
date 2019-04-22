<template>
    <div>
        <table class="table1" ref="table">
            <tr>
                <th>日</th>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
            </tr>
            <tr v-for="i in 6">
                <td v-for="j in 7" :class="{'gray':dateArr[(i - 1) * 7 + (j - 1)].gray}">
                    <!-- 这里就是一个日历小格 -->
                    <!-- 日子 -->
                    <p class="pp1">
                        {{dateArr[(i - 1) * 7 + (j - 1)].date}}
                    </p>
                    <!-- 农历 -->
                    <p class="pp2">
                        {{
                            solar2lunar(year, dateArr[(i - 1) * 7 + (j - 1)].month, dateArr[(i - 1) * 7 + (j - 1)].date).term 
                            ||
                            solar2lunar(year, dateArr[(i - 1) * 7 + (j - 1)].month, dateArr[(i - 1) * 7 + (j - 1)].date).dayCn 
                        }}
                    </p>

                    <!-- 角标 -->
                    <img v-show="checkBanXiu(dateArr[(i - 1) * 7 + (j - 1)].timestamp) == '班'" class="jiaobiao" src="/images/ban.png" />
                    <img v-show="checkBanXiu(dateArr[(i - 1) * 7 + (j - 1)].timestamp) == '休'" class="jiaobiao" src="/images/xiu.png" />
                    <div 
                        class="bbar" 
                        v-for="idx in howManyThingStartInthisDay(dateArr[(i - 1) * 7 + (j - 1)].timestamp)"
                        :key="idx"
                        v-show="
                            showBBbar(dateArr[(i - 1) * 7 + (j - 1)].timestamp,idx).title
                        "
                        :style="{
                            'width': showBBbar(dateArr[(i - 1) * 7 + (j - 1)].timestamp,idx).duration * gridW - 16 + 'px',
                            'top':28 + baseTop[(i - 1) * 7 + (j - 1)] * 22 - idx * 22 + 'px'
                        }"
                        :data-type="showBBbar(dateArr[(i - 1) * 7 + (j - 1)].timestamp,idx).type"
                    >
                        {{
                            showBBbar(
                                dateArr[(i - 1) * 7 + (j - 1)].timestamp
                                ,idx
                            ).title
                        }}
                    </div>
                    
                    <!-- 这里就是一个日历小格 -->
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import solarLunar from 'solarlunar';

export default {
    data(){
        return {
            // 日历形态数组
            dateArr : [],
            // 每个格多款
            gridW : 0,
            baseTop : new Array(42).fill(0)
        }
    },
    // 上树
    mounted(){
        // 得到小格的宽度
        var sampleTd = this.$refs.table.getElementsByTagName("td")[0];
        this.gridW = parseInt(window.getComputedStyle(sampleTd)["width"]);

    },
    computed: {
        year(){
            return this.$store.state.schedule.year;
        },
        month(){
            return this.$store.state.schedule.month;
        },
        specialDay(){
            return this.$store.state.schedule.specialDay;
        },
        schedules(){
            return this.$store.state.schedule.schedules;
        }
    },
    // 组件诞生的时候做的事情
    created(){
        // 计算表格的形态
        this.calc();
        // 计算basetop
        this.calcBasetop();
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
        // 核心函数，计算日历的形态
        calc(){
            // 清空数组
            this.dateArr = [];
            // 计算三要素
            // 人类的年份和月份从store中拿
            const year = this.$store.state.schedule.year;
            const month = this.$store.state.schedule.month;
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
        },
        calcBasetop(){
            // 先把跨周解决掉
            // 好比4月8日开始10天的事情，能够在4月14日，新增一个4天的续的日子。
            for(let i = 0 ; i < this.schedules.length ; i++){
                // 找到是第几个格子
                for(let m = 0; m < this.dateArr.length ; m++){
                    // 匹配日子
                    if(this.schedules[i].start == this.dateArr[m].timestamp){
                        // 看这是第几行第几个
                        var row = parseInt(m / 7);
                        var col = m % 7;
                        // 这个格最多能持续的天
                        var maxchixuday = 7 - col;
                        // 看超没超
                        if(this.schedules[i].duration > maxchixuday){
                            this.schedules.push({
                                start : this.schedules[i].start + (7 - col) * 86400000,
                                title : this.schedules[i].title,
                                duration : this.schedules[i].duration - maxchixuday,
                                type : this.schedules[i].type 
                            })
                        }
                    }
                } 
            }

            // 排序
            // this.schedules = this.schedules.sort((a,b)=>a.start - b.start)

            
            // 遍历schedules数组，
            for(let i = 0 ; i < this.schedules.length ; i++){
                // 找到是第几个格子
                for(let m = 0; m < this.dateArr.length ; m++){
                    // 匹配日子
                    if(this.schedules[i].start == this.dateArr[m].timestamp){
                        for(let j = 0 ; j < this.schedules[i].duration ; j++){
                            var col = m % 7;
                            if(col + j < 7){
                                this.baseTop[m + j] ++;
                            }
                        }
                    }
                } 
            }
        },
        // BBbar服务函数
        // idx表示小格的小序号0~41
        showBBbar(timestamp, idx){
            var count = 0;
            for(let i = 0 ; i < this.schedules.length ; i++){
                if(this.schedules[i].start == timestamp){
                    // 如果现在要的idx和计数器一样了，就说明现在要这条了
                    // （vue的idx从1开始数，所以这里count要加1之后比较）
                    count++;
                    if(count == idx){
                        var d = this.schedules[i].duration;
                        if(d >= 7 - ((idx - 1) % 7)){
                            d = 7 - ((idx - 1) % 7)
                        }
                        return {
                            ...this.schedules[i],
                            duration : d
                        };
                    }
                }
            }
            return {};
        },
        howManyThingStartInthisDay(timestamp){
            var count = 0;
            for(let i = 0 ; i < this.schedules.length ; i++){
                if(this.schedules[i].start == timestamp){
                    count ++;
                }
            }
            return count;
        }
    },
    // 监控
    watch: {
        // 每当全局store中的年份变化，立即重新计算日历样式
        year(){
            this.calc();
        },
        // 每当全局store中的月份变化，立即重新计算日历样式
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
            height:100px;
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
            .pp1{
                position:absolute;
                top:6px;
                left:5px;
                font-weight: bold;
                color: #0d6555;
                font-size: 18px;
            }
            .pp2{
                position:absolute;
                top:10px;
                left:35px;
            }
            .bbar{
                position: absolute;
                top:45px;
                left:5px;
                width:100px;
                height:20px;
                border-radius: 4px;
                color: white;
                font-size:10px;
                line-height: 20px;
                padding-left:3px;
                z-index:9999;
            }
            .bbar[data-type=COMPETITION]{
                background-image:-webkit-linear-gradient(top, #ff40e7, #a71b7c);
            }
            .bbar[data-type=BUSSUNESS]{
                background-image:-webkit-linear-gradient(top, #472aee, #053b5f);
            }
        }
    }
</style>